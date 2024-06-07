import {useState} from 'react';

export default function EditProfile() {
    const [input, setInput] = useState({
        firstName : '',
        lastName : '',
    });
    const [isRead, setIsRead] = useState(true);

    // 인풋 핸들러
    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });
    }

    return (
        <form onSubmit={e => {
            e.preventDefault(); // 새로고침 방지
            setIsRead(!isRead);
        }}>
            <label>
                First name:{' '}
                {isRead ? <b>{input.firstName}</b> : <input name={'firstName'} value={input.firstName} onChange={handleInputChange}/>}
            </label>
            <label>
                Last name:{' '}
                {isRead ? <b>{input.lastName}</b>: <input name={'lastName'} value={input.lastName} onChange={handleInputChange}/>}
            </label>
            <button type="submit">
                {`${isRead ? 'Edit' : 'Save'} Profile`}
            </button>
            <p><i>Hello, Jane Jacobs!</i></p>
        </form>
    );
}
