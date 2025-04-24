import './UserCard.css';

type Props = {
    name: string;
    job: string;
    avatarUrl: string;
}

export function UserCard({ name, job, avatarUrl }: Props) {
    const handleFollow = () => {
        alert(`Followed ${name}!`);
    };

    return (
        <div className="card">
            <img src={avatarUrl} alt={`${name} avatar`} className="avatar" />
            <h2>{name}</h2>
            <p>{job}</p>
            <button onClick={handleFollow}>Follow</button>
        </div>
    )
}