import { LoginForm } from "../features/authentication/components/authentication";

interface HomePageProps {
    displayLogin: boolean;
}

export default function HomePage(props: HomePageProps):JSX.Element {
    return(
        <div className="page">
            HomePage
            {props.displayLogin? <LoginForm /> : <></>}
        </div>
    )
}