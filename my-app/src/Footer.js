const Footer = () =>{
    const today = new Date();
    return (
        <footer>
            <p>Copyrigt &copy;{today.getFullYear()}</p>
        </footer>
    )
}
export default Footer