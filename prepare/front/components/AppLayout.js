import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
    return (
        <div>
            <div>
                <Link href="/"><a>Home</a></Link>
                <Link href="/profile"><a>Profile</a></Link>
                <Link href="/signup"><a>Signup</a></Link>
            </div>
            {children}
        </div>
    )
}

AppLayout.prototype = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;