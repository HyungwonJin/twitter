import Head from 'next/head';
import AppLayout from "../components/AppLayout";

const Profile = () => {
    return (
        <>
            <Head>
                <title>내 프로필 | Twitter</title>
            </Head>
            <AppLayout>내 프로필</AppLayout>
        </>
    )
}

export default Profile;