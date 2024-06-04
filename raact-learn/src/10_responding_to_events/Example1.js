export default function Button() {

    function handleClick() {
        alert('You clicked me');
    }


    return (
        <button onClick={handleClick}>
            I don't do anything
        </button>
    );
}
