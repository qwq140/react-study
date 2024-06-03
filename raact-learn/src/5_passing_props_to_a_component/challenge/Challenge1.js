import {getImageUrl} from './utils.js';
import './challenge1.css';

function Profile({name, imageId, imageSize, profession, awards, discovery}) {
    return (
        <section className="profile">
            <h2>{name}</h2>
            <img
                className="avatar"
                src={getImageUrl(imageId)}
                alt={name}
                width={imageSize}
                height={imageSize}
            />
            <ul>
                <li>
                    <b>Profession: </b>
                    {profession}
                </li>
                <li>
                    <b>Awards: {awards.length} </b>
                    ({awards.join(',')})
                </li>
                <li>
                    <b>Discovered: </b>
                    {discovery}
                </li>
            </ul>
        </section>
    );
}

export default function Gallery() {
    return (
        <div>
            <h1>Notable Scientists</h1>
            <Profile
                name={'Katsuko Saruhashi'}
                imageId={'YfeOqp2'}
                imageSize={70}
                profession={'geochemist'}
                awards={[
                    'Miyake Prize for geochemistry',
                    'Tanaka Prize'
                ]}
                discovery={'a method for measuring carbon dioxide in seawater'}
            />

        </div>
    );
}
