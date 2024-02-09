import "../Styles/Dashboard.css"
type breadcrumbProps = {
    page: string
}
const Breadcrumb = ({page}:breadcrumbProps) => {
  return (
    <div className="breadcrumb">
        <i className="fa-solid fa-chevron-right"></i>
        <h2>{page}</h2>
    </div>
  )
}

export default Breadcrumb