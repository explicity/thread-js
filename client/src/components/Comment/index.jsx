import React from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentUI, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';

const Comment = ({comment, likeComment}) => {
    const {
        body, createdAt, user, id 
    } = comment;
    const date = moment(createdAt).fromNow();
    console.log(comment);
    return (
        <CommentUI className={styles.comment}>
            <CommentUI.Avatar src={getUserImgLink(user.image)} />
            <CommentUI.Content>
                <CommentUI.Author as="a">{user.username}</CommentUI.Author>
                <CommentUI.Metadata>{date}</CommentUI.Metadata>
                <CommentUI.Text>{body}</CommentUI.Text>
                <Label
                    basic
                    size="small"
                    as="a"
                    onClick={() => likeComment(id)}
                >
                    <Icon name="thumbs up" />
                </Label>
                {' '}
            </CommentUI.Content>
        </CommentUI>
    );
};

Comment.propTypes = {
    comment: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Comment;
