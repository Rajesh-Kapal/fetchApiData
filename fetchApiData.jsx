import axios from "axios";
import { useEffect, useState } from "react"
export function FetchApiData() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [arrowUp, setArrowUp] = useState('bi bi-arrow-up ')
    const [arrowDown, setArrowDown] = useState('bi bi-arrow-down  ');
    const [select, setSelect] = useState();

    const filterData = select ? data.filter(item => item.gender.toLowerCase() === select.toLowerCase()) : data;
    const dataPerPage = 10;
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    const records = filterData.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(filterData.length / dataPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1)

    //  UseEffect

    useEffect(() => {
        fetchData();
    }, []);

    // fetch  data from API url

    function fetchData() {
        async function fetchApi() {
            let response = await axios.get('https://dummyjson.com/users');
            setData(response.data.users);
        }
        fetchApi();
    }

    // Ascending Order

    function sortingId() {
        let respone = [...data];
        if (respone.length > 0) {
            let result = respone.sort().reverse();
            setData(result);
            setArrowUp(`${arrowDown} text-danger`)
        }
        setArrowDown(`${arrowUp}`)
    }

    //Ascendig for Full Name

    function ascendOrd() {
        let respone = [...data];
        if (respone.length > 0) {
            let result = respone.sort((a, b) => a.firstName.localeCompare(b.firstName))
            setData(result);
            setArrowUp(`${arrowDown} text-danger`)

        }
    }

    // Descendig for Full name

    function descendOrd() {
        let respone = [...data];
        if (respone.length > 0) {
            let result = respone.sort((a, b) => b.firstName.localeCompare(a.firstName))
            setData(result);
            setArrowUp('text-danger')
        }

    }

    // Previous Click

    function previousClick() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Page Number Click

    function pageClick(id) {
        setCurrentPage(id)
    }

    // Next click

    function nextClick() {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    // fetched api embedded in tbody through a variable

    var show = records.map((item, index) => (
        <tbody>
            <tr key={index}>
                <td>{item.id}</td>
                <td><img src={item.image} width="30" alt="" /></td>
                <td>{item.firstName} {item.maidenName} {item.lastName} </td>
                <td>{item.gender.toUpperCase().slice(0, 1)}/{item.age} </td>
                <td>{item.company.title}</td>
                <td>{item.address.state},{item.address.country}</td>
            </tr>
        </tbody>
    ))

    return (
        <div className=" container-fluid">
            <div className="mt-2 d-flex justify-content-between">
                <h3>Employee</h3>
                <div className="w-25 d-flex ">
                    <select style={{ cursor: 'pointer' }} value={select} className="form-select" onChange={e => setSelect(e.target.value)} >
                        <option disabled>Gender</option>
                        <option  >Male</option>
                        <option  >Female</option>
                    </select>
                    <select className="form-select" id="">
                        <option >USA</option>
                    </select>
                </div>
            </div>

            {/* Table to show data */}

            <table style={{ cursor: 'pointer' }} className="table table-hover m-2 border rounded-2  text-left">
                <thead >
                    <tr>
                        <th>ID<span onClick={sortingId} className={arrowUp}></span> </th>
                        <th>Image</th>
                        <th>Full Name<span onClick={ascendOrd} className='bi bi-arrow-down'></span><span onClick={descendOrd} className='bi bi-arrow-up'></span></th>
                        <th>Demography</th>
                        <th>Location</th>
                    </tr>
                </thead>
                {show}
            </table>

            {/* Pagination */}

            <nav className="d-flex  justify-content-center align-items-center">
                <ul style={{ cursor: 'pointer' }} className="pagination">
                    <li className="page-item pe-2">
                        <a className="page-link" onClick={previousClick} >Previous</a>
                    </li>
                    {
                        numbers.map((item, index) => (
                            <li className={`page-item pe-2 ${currentPage === item ? 'active' : ''}`} key={index}>
                                <a onClick={() => pageClick(item)} className="page-link">{item}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a className="page-link" onClick={nextClick}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
