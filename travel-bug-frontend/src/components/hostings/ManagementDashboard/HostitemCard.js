import React from 'react'
import { Link } from 'react-router-dom';
const HostitemCard = (props) => {
    const { hostItem } = props;

    return (
        <Link to="#" class="list-group-item list-group-item-primary">
                <div class="d-flex w-100 justify-content-between">
                  <h3 className="mb-1"> {hostItem.hostingTitle}</h3>
                  <small>Date: {hostItem.hostingDate}</small>
                </div>
                <p class="mb-1"><h7>{hostItem.description} </h7></p>
            </Link>
    )
}

export default HostitemCard
