interface DraftResults {
    type: string;
    api: string;
}

function Results() {
    return (
        <div>
            {/* <h1>2021 Draft Results by {props.type}</h1>
            {props.api.map((picks, index) => (
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
            ))} */}
        </div>
    );
}

export default Results();
