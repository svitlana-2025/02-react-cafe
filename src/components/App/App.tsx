import { useState, useEffect } from "react";
import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import type { Votes, VoteType } from "../../types/votes";

const App = () => {
    const [votes, setVotes] = useState<Votes>(() => {
        const savedVotes = localStorage.getItem("feedback-votes");
        return savedVotes
            ? JSON.parse(savedVotes)
            : { good: 0, neutral: 0, bad: 0 };
    });

    useEffect(() => {
        localStorage.setItem("feedback-votes", JSON.stringify(votes));
    }, [votes]);

    const handleVote = (type: VoteType) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [type]: prevVotes[type] + 1,
        }));
    };

    const resetVotes = () => {
        setVotes({ good: 0, neutral: 0, bad: 0 });
    };

    const { good, neutral, bad } = votes;
    const totalVotes = good + neutral + bad;
    const positiveRate = totalVotes ? Math.round((good / totalVotes) * 100) : 0;

    return (
        <div className={css.app}>
            <CafeInfo />
            <VoteOptions
                onVote={handleVote}
                onReset={resetVotes}
                canReset={totalVotes > 0}
            />
            {totalVotes > 0 ? (
                <VoteStats
                    votes={votes}
                    totalVotes={totalVotes}
                    positiveRate={positiveRate}
                />
            ) : (
                <Notification />
            )}
        </div>
    );
};

export default App;