import React, {useState} from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    User: {
        minHeight: 40,
        padding: 40,
        backgroundColor: '#fff',
        color: '#949494',
        borderBottom: '1px solid #e4e4e4',
        "&:last-child": {
            borderBottom: 'inherit'
        }
    },
    Infos: {float: 'left'},
    UserName: {
        fontWeight: 'bold',
        fontSize: 20,
        float: 'left',
        marginBottom: 5
    },
    UserEmail: {
        textDecoration: 'none',
        color: '#949494',
        float: 'left'
    },
    Arrow: {float: 'right'}
});

function User(props) {
    const classes = useStyles(props);
    const [user, setUser] = useState(props.user);
    console.log(props);
    return (
        <li className={classes.User}>
            <div className={classes.Infos}>
                <span className={classes.UserName}>{user.name}</span>
                <br/>
                <a href={`mailto:${user.email}`} className={classes.UserEmail}>{user.email}</a>
            </div>
            <img src="./arrow.svg" width="42" alt="➡️" className={classes.Arrow}/>
        </li>
    );
}

export default User;
