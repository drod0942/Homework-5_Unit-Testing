import React from 'react';

const DeleteComponent = ({ songDetails, deleteSong, goBack }) => {
    return (
        <div>
            <p>Are you sure want to delete this?</p>
            <button onClick={() => deleteSong(songDetails.song)}>Delete</button>
            <button onClick={goBack}>Go back</button>
        </div>
    )
}

export default DeleteComponent;