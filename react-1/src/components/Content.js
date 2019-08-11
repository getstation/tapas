import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
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
        marginBlockStart: 30,
        marginBlockEnd: 0,
        listStyleType: "none",
        boxShadow: '0 0 60px -30px rgba(0,0,0,0.75)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            width: '0 !important'
        }
    }
});

const Content = props => {
    const classes = useStyles(props);
    const [hasError, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const moveUser = (dragIndex, hoverIndex) => {
        const dragUser = users[dragIndex];
        setUsers(
            update(users, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragUser]],
            }),
        )
    };

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
                <DndProvider backend={HTML5Backend}>
                    {users.map((user, i) => (<User user={user} index={i} key={user.id} id={user.id} moveUser={moveUser}/>))}
                </DndProvider>
            </ul>
        </section>
    );
};

export default Content;
