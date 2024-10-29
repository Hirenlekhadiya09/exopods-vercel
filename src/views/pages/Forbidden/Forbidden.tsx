import { Link } from "react-router-dom"

import { configPages } from "config/configPages"

import Container from "atoms/Container"

function Forbidden() {
    return (
        <Container>

            <div>
                <h1>403 Forbidden</h1>
                <p>You are not allowed to access the requested page.</p>
                <Link to={configPages.DASHBOARD.path}>Back home</Link>
            </div>

        </Container>
    )
}

export default Forbidden
