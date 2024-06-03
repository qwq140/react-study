import Avatar from "./Avartar";

function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

export default function Profile() {
    return (
        <Card>
            <Avatar
                person={{name : 'Lin Lanying', imageId : '1bX5QH6'}}
                size={100}
            />
        </Card>
    );
}
