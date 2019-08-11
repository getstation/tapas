import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss'
import Loader from './Loader';
import User from './User';

const useStyles = createUseStyles({
    Content: {
        width: '90%',
        minHeight: 400,
        margin: 30,
        backgroundImage: props => props.themeGradient
    },
    List: {
        height: '67vh',
        paddingInlineStart: 0,
        borderRadius: "15px",
        marginBlockStart: 0,
        marginBlockEnd: 0,
        listStyleType: "none",
        boxShadow: '0 0 60px -30px rgba(0,0,0,0.75)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            width: '0 !important'
        },
        backgroundImage:
            '-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ffffff), color-stop(100%, rgba(255, 255, 255, 0))), -webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(0%, #ffffff), color-stop(100%, rgba(255, 255, 255, 0))), -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #95e0c0), color-stop(100%, rgba(255, 255, 255, 0))), -webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(0%, #95e0c0), color-stop(100%, rgba(255, 255, 255, 0)))',
        backgroundPosition: "0 0, 0 100%, 0 0, 0 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
        backgroundSize: "100% 5em, 100% 5em, 100% 1em, 100% 1em",
        backgroundAttachment: "local, local, scroll, scroll"
    }
});

const Content = props => {
    const classes = useStyles(props);
    const [hasError, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    async function fetchData() {
        const res = await fetch("http://jsonplaceholder.typicode.com/users");
        res.json()
            .then(res => {
                setUsers(res);
                setLoading(false);
            })
            .catch(() => setErrors(true));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className={classes.Content}>
            {loading ? <Loader/> : null}
            <ul className={classes.List}>
                {users.map((user, i) => (<User user={user} key={i}/>))}
            </ul>
        </section>
    );
};

export default Content;
