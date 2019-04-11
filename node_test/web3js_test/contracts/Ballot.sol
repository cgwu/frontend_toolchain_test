pragma solidity >=0.4.22 <0.7.0;

contract Ballot {
    // 投票人
    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
    // 提案
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    // 主席
    address public chairperson;

    // 地址 => 投票人
    mapping(address => Voter) public voters;

    // 提案项
    Proposal[] public proposals;

    /*
     * 在Remix IDE中传参数格式示例：[ "0x0a", "0x0b", "0x0c" ];
     * 如果通过js中部署合约则在传递函数是通过web3.fromAscii('Rama'),此方法未实验.
     */
    constructor(bytes32[] memory proposalNames) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        for(uint i=0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote"
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        voters[voter].weight = 1;
    }

    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        require(to != msg.sender, "Self-delegation is not allowed");
        while(voters[to].delegate != address(0)) {
            to = voters[to].delegate;
            require(to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if(delegate_.voted) {
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            delegate_.weight += sender.weight;
        }
    }

    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }

    function winningProposal() public view
        returns (uint winningProposal_) {
            uint winningVoteCount = 0;
            for(uint p = 0; p < proposals.length; p++) {
                if(proposals[p].voteCount > winningVoteCount) {
                    winningVoteCount = proposals[p].voteCount;
                    winningProposal_ = p;
                }
            }
    }

    function winnerName() public view 
    returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }

}
