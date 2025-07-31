module aptos_vibes::vibe_voting {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::event;
    use aptos_std::table::{Self, Table};
    use aptos_framework::account;

    /// Voting system has not been initialized yet
    const E_NOT_INITIALIZED: u64 = 1;
    /// You have already voted for this project
    const E_ALREADY_VOTED: u64 = 2;
    /// You haven't voted for this project yet
    const E_NO_VOTE_TO_REMOVE: u64 = 3;
    /// You are not authorized to vote
    const E_NOT_AUTHORIZED: u64 = 4;

    const VOTE_UP: u8 = 1;
    const VOTE_DOWN: u8 = 2;

    struct ProjectVotes has key, store {
        upvotes: u64,
        downvotes: u64,
        voters: Table<address, u8>, // voter address -> vote type (1=up, 2=down)
    }

    struct VotingRegistry has key {
        projects: Table<String, ProjectVotes>,
        allowlist: vector<address>,
        allowlist_enabled: bool,
    }

    #[event]
    struct VoteEvent has drop, store {
        voter: address,
        project_id: String,
        vote_type: u8, // 1=up, 2=down, 0=removed
        timestamp: u64,
    }

    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        if (!exists<VotingRegistry>(admin_addr)) {
            move_to(admin, VotingRegistry {
                projects: table::new(),
                allowlist: vector::empty<address>(),
                allowlist_enabled: true, // Default to enabled for security
            });
        }
    }

    public entry fun initialize_project(admin: &signer, project_id: String) acquires VotingRegistry {
        let admin_addr = signer::address_of(admin);
        assert!(exists<VotingRegistry>(admin_addr), E_NOT_INITIALIZED);
        
        let registry = borrow_global_mut<VotingRegistry>(admin_addr);
        
        if (!table::contains(&registry.projects, project_id)) {
            table::add(&mut registry.projects, project_id, ProjectVotes {
                upvotes: 0,
                downvotes: 0,
                voters: table::new(),
            });
        }
    }

    public entry fun add_to_allowlist(admin: &signer, voter_addr: address) acquires VotingRegistry {
        let admin_addr = signer::address_of(admin);
        assert!(exists<VotingRegistry>(admin_addr), E_NOT_INITIALIZED);
        
        let registry = borrow_global_mut<VotingRegistry>(admin_addr);
        if (!vector::contains(&registry.allowlist, &voter_addr)) {
            vector::push_back(&mut registry.allowlist, voter_addr);
        }
    }

    public entry fun remove_from_allowlist(admin: &signer, voter_addr: address) acquires VotingRegistry {
        let admin_addr = signer::address_of(admin);
        assert!(exists<VotingRegistry>(admin_addr), E_NOT_INITIALIZED);
        
        let registry = borrow_global_mut<VotingRegistry>(admin_addr);
        let (found, index) = vector::index_of(&registry.allowlist, &voter_addr);
        if (found) {
            vector::remove(&mut registry.allowlist, index);
        }
    }

    public entry fun toggle_allowlist(admin: &signer, enabled: bool) acquires VotingRegistry {
        let admin_addr = signer::address_of(admin);
        assert!(exists<VotingRegistry>(admin_addr), E_NOT_INITIALIZED);
        
        let registry = borrow_global_mut<VotingRegistry>(admin_addr);
        registry.allowlist_enabled = enabled;
    }

    public entry fun upvote(voter: &signer, admin_addr: address, project_id: String) acquires VotingRegistry {
        vote_internal(voter, admin_addr, project_id, VOTE_UP);
    }

    public entry fun downvote(voter: &signer, admin_addr: address, project_id: String) acquires VotingRegistry {
        vote_internal(voter, admin_addr, project_id, VOTE_DOWN);
    }

    public entry fun remove_vote(voter: &signer, admin_addr: address, project_id: String) acquires VotingRegistry {
        let voter_addr = signer::address_of(voter);
        assert!(exists<VotingRegistry>(admin_addr), E_NOT_INITIALIZED);
        
        let registry = borrow_global_mut<VotingRegistry>(admin_addr);
        assert!(table::contains(&registry.projects, project_id), E_NOT_INITIALIZED);
        
        let project_votes = table::borrow_mut(&mut registry.projects, project_id);
        assert!(table::contains(&project_votes.voters, voter_addr), E_NO_VOTE_TO_REMOVE);
        
        let previous_vote = table::remove(&mut project_votes.voters, voter_addr);
        
        // Decrement the appropriate vote count
        if (previous_vote == VOTE_UP) {
            project_votes.upvotes = project_votes.upvotes - 1;
        } else {
            project_votes.downvotes = project_votes.downvotes - 1;
        };

        // Emit vote removed event
        event::emit(VoteEvent {
            voter: voter_addr,
            project_id,
            vote_type: 0, // 0 indicates vote removal
            timestamp: aptos_framework::timestamp::now_microseconds(),
        });
    }

    fun vote_internal(voter: &signer, admin_addr: address, project_id: String, vote_type: u8) acquires VotingRegistry {
        let voter_addr = signer::address_of(voter);
        assert!(exists<VotingRegistry>(admin_addr), E_NOT_INITIALIZED);
        
        // Check if address is allowed to vote (before mutable borrow)
        assert!(is_address_allowed(admin_addr, voter_addr), E_NOT_AUTHORIZED);
        
        let registry = borrow_global_mut<VotingRegistry>(admin_addr);
        assert!(table::contains(&registry.projects, project_id), E_NOT_INITIALIZED);
        
        let project_votes = table::borrow_mut(&mut registry.projects, project_id);
        
        // Check if user has already voted
        if (table::contains(&project_votes.voters, voter_addr)) {
            let previous_vote = table::remove(&mut project_votes.voters, voter_addr);
            
            // Decrement previous vote count
            if (previous_vote == VOTE_UP) {
                project_votes.upvotes = project_votes.upvotes - 1;
            } else {
                project_votes.downvotes = project_votes.downvotes - 1;
            };
            
            // If same vote type, just remove (toggle off)
            if (previous_vote == vote_type) {
                event::emit(VoteEvent {
                    voter: voter_addr,
                    project_id,
                    vote_type: 0, // 0 indicates vote removal
                    timestamp: aptos_framework::timestamp::now_microseconds(),
                });
                return
            };
        };
        
        // Add new vote
        table::add(&mut project_votes.voters, voter_addr, vote_type);
        
        // Increment vote count
        if (vote_type == VOTE_UP) {
            project_votes.upvotes = project_votes.upvotes + 1;
        } else {
            project_votes.downvotes = project_votes.downvotes + 1;
        };

        // Emit vote event
        event::emit(VoteEvent {
            voter: voter_addr,
            project_id,
            vote_type,
            timestamp: aptos_framework::timestamp::now_microseconds(),
        });
    }

    #[view]
    public fun is_address_allowed(admin_addr: address, voter_addr: address): bool acquires VotingRegistry {
        if (!exists<VotingRegistry>(admin_addr)) {
            return false // Registry doesn't exist, not allowed
        };
        
        let registry = borrow_global<VotingRegistry>(admin_addr);
        
        // If allowlist is disabled, everyone is allowed
        if (!registry.allowlist_enabled) {
            return true
        };
        
        // If allowlist is enabled, check if user is on it
        vector::contains(&registry.allowlist, &voter_addr)
    }

    #[view]
    public fun get_project_votes(admin_addr: address, project_id: String): (u64, u64) acquires VotingRegistry {
        if (!exists<VotingRegistry>(admin_addr)) {
            return (0, 0)
        };
        
        let registry = borrow_global<VotingRegistry>(admin_addr);
        if (!table::contains(&registry.projects, project_id)) {
            return (0, 0)
        };
        
        let project_votes = table::borrow(&registry.projects, project_id);
        (project_votes.upvotes, project_votes.downvotes)
    }

    #[view]
    public fun get_user_vote(admin_addr: address, project_id: String, user_addr: address): u8 acquires VotingRegistry {
        if (!exists<VotingRegistry>(admin_addr)) {
            return 0
        };
        
        let registry = borrow_global<VotingRegistry>(admin_addr);
        if (!table::contains(&registry.projects, project_id)) {
            return 0
        };
        
        let project_votes = table::borrow(&registry.projects, project_id);
        if (!table::contains(&project_votes.voters, user_addr)) {
            return 0
        };
        
        *table::borrow(&project_votes.voters, user_addr)
    }

    #[view]
    public fun get_vibe_score(admin_addr: address, project_id: String): u64 acquires VotingRegistry {
        let (upvotes, downvotes) = get_project_votes(admin_addr, project_id);
        if (upvotes > downvotes) {
            upvotes - downvotes
        } else {
            0
        }
    }

    #[test_only]
    use aptos_framework::timestamp;
    #[test_only]
    use aptos_framework::account::create_account_for_test;

    #[test(admin = @0x123, voter1 = @0x456, voter2 = @0x789)]
    public fun test_upvote_downvote_works(admin: &signer, voter1: &signer, voter2: &signer) acquires VotingRegistry {
        // Setup
        timestamp::set_time_has_started_for_testing(&account::create_signer_with_capability(&account::create_test_signer_cap(@0x1)));
        
        let admin_addr = signer::address_of(admin);
        let voter1_addr = signer::address_of(voter1);
        let voter2_addr = signer::address_of(voter2);
        
        create_account_for_test(admin_addr);
        create_account_for_test(voter1_addr);
        create_account_for_test(voter2_addr);

        // Initialize (disable allowlist to avoid mechanics)
        initialize(admin);
        toggle_allowlist(admin, false);
        
        let project_id = string::utf8(b"test_project");
        initialize_project(admin, project_id);
        
        // Test upvote works
        upvote(voter1, admin_addr, project_id);
        let (upvotes, downvotes) = get_project_votes(admin_addr, project_id);
        assert!(upvotes == 1, 1);
        assert!(downvotes == 0, 2);
        
        // Test downvote works
        downvote(voter2, admin_addr, project_id);
        let (upvotes, downvotes) = get_project_votes(admin_addr, project_id);
        assert!(upvotes == 1, 3);
        assert!(downvotes == 1, 4);
    }

    #[test(admin = @0x123, random_user = @0x999)]
    public fun test_voter_eligibility(admin: &signer, random_user: &signer) acquires VotingRegistry {
        // Setup
        timestamp::set_time_has_started_for_testing(&account::create_signer_with_capability(&account::create_test_signer_cap(@0x1)));
        
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(random_user);
        
        create_account_for_test(admin_addr);
        create_account_for_test(user_addr);
        
        initialize(admin);
        let project_id = string::utf8(b"test_project");
        initialize_project(admin, project_id);
        
        // Test toggle ON (allowlist enabled) - should fail
        toggle_allowlist(admin, true);
        assert!(!is_address_allowed(admin_addr, user_addr), 1);
        
        // Test toggle OFF (allowlist disabled) - should pass
        toggle_allowlist(admin, false);
        assert!(is_address_allowed(admin_addr, user_addr), 2);
        upvote(random_user, admin_addr, project_id);
        assert!(get_user_vote(admin_addr, project_id, user_addr) == VOTE_UP, 3);
    }
} 