export default function Errors({httpCode, message}) {
    return (
        <section className="container">
            <h1>Error {httpCode}</h1>
            <p>{message}</p>
        </section>
    )
}