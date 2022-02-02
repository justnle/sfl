import { useEffect, useState } from 'react';
import axios from 'axios';

interface DraftData {
    round: string;
    pick_no: number;
    metadata: {
        first_name: string;
        last_name: string;
    };
    picked_by: string;
}

interface UserData {
    user_id: string;
    display_name: string;
}

// interface DraftSettings {
//     season: string;
//     metadata: {
//         name: string;
//     };
//     settings: {
//         [key: string]: number;
//     };
// }

interface DraftSettings {
    draft_order: {
        [user_id: string]: number;
    };
}

interface User {
    [username: string]: string[];
}

const draftURL: string = `https://api.sleeper.app/v1/draft/725422224324001793/picks`;
const userURL: string = `https://api.sleeper.app/v1/league/725422224324001792/users`;
// const settingsURL: string = `https://api.sleeper.app/v1/league/725422224324001792/drafts`;
const settingsURL: string = `https://api.sleeper.app/v1/draft/725422224324001793`;

function Draft() {
    const [draft, setDraft] = useState<DraftData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [settings, setSettings] = useState<DraftSettings>();

    useEffect(() => {
        axios.get(draftURL).then((res) => {
            setDraft(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(userURL).then((res) => {
            setUsers(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(settingsURL).then((res) => {
            setSettings(res.data);
        });
    }, []);

    if (!draft || !users || !settings) return null;

    const findUser = (id: string) => {
        let name: string = ``;

        users.forEach((item) => {
            if (item.user_id === id) {
                name = item.display_name;
                return name;
            }
        });
        return name;
    };

    const buildRoster = () => {
        const userMap: User = {};
        const draftOrder = settings.draft_order;

        for (const user of users) {
            if (!userMap[user.display_name]) {
                userMap[user.display_name] = [];
            }
        }

        // console.log(userMap);
        // console.log(draft);
        console.log(draftOrder);
    };

    buildRoster();

    return (
        <>
            <div>
                <h1>2021 Draft Results by Round</h1>
                {draft.map((picks, index) => (
                    <div key={index}>
                        {index % 10 === 0 && (
                            <>
                                <br></br>
                                <b>Round {picks.round}</b>
                                <br></br>
                            </>
                        )}
                        <b>
                            {`${picks.pick_no}: ${picks.metadata.first_name} ${
                                picks.metadata.last_name
                            } by ${findUser(picks.picked_by)}`}
                        </b>
                    </div>
                ))}
            </div>
            <div>
                <h1>2021 Draft Results by Team</h1>
            </div>
        </>
    );
}

export default Draft;
