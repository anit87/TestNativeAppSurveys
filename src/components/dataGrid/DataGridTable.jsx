import React, { useState, useEffect } from 'react'; 
import moment from 'moment';
import { Button, Stack, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import dayjs from 'dayjs';
import { capitalizeFirstLetter, verifyUser } from '../../utils/functions/verifyUser';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"

import CustomTablePagination from '../TablePaginationActions';
import DynamicDatePicker from '../inputs/DynamicDatePicker';
import Loader from '../loader';
import NoData from '../NoData';
import TableHeader from './TableHeader';
import { SelectInput } from '../inputs/SelectInput';
import { incomeOptions, maritalOptions, trueFalseOptions, educationalOptions, religionOptions, occupationOptios, casteOptions } from "../../utils/constants"

const tableCells = [
    { label: 'S.No' },
    { label: 'Respondent Name' },
    { label: 'Mobile No', textAlign: "center" },
    { label: 'Pincode', textAlign: "center" },
    { label: 'Marital Status', textAlign: "center" },
    { label: 'Created Date', textAlign: "center" },
    { label: '' }
]

const apiUrl = import.meta.env.VITE_API_URL

const isAgentActive = (inputDate) => {
    const inputDateObj = dayjs(inputDate)
    let fiveDaysAgo = new Date();

    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    fiveDaysAgo = dayjs(fiveDaysAgo)

    const isAfter = inputDateObj.isAfter(fiveDaysAgo);
    return isAfter
}
const formatDate = (dateString) => {
    const parsedDate = moment(dateString);
    const formattedDate = parsedDate.format("DD-MM-YYYY HH:mm");
    return formattedDate
}

export default function SurveyForms() {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState({
        status: false,
        data: []
    })
    const [isLoading, setisLoading] = useState(false)

    const [filterData, setFilterData] = useState({
        birthdayDate: '',
        maritalStatus: '',
        monthlyHouseholdIncome: '',
        isOwnProperty: '',
        occupationStatus: '',
        religion: '',
        caste: '',
        cweEducation: '',
        startDate: '2023-08-01',
        endDate: new Date().toISOString().slice(0, 10)
    });

    const [activeAgents, setActiveAgents] = useState({
        status: false,
        result: { agents: [], fieldAgents: [] }
    })

    const [userDetail, setUserDetail] = useState({})
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        const user = verifyUser(token)
        setUserDetail(user)
        getActiveUsers()
    }, [])

    useEffect(() => {
        getData()
    }, [filterData])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("surveyApp"),
    };

    const getData = async () => {
        try {
            const { isOwnProperty, maritalStatus, monthlyHouseholdIncome, occupationStatus, religion, caste, cweEducation, startDate, endDate } = filterData

            setisLoading(true)
            const url = `${apiUrl}/users/allrecords?isOwnProperty=${isOwnProperty.toString() || ""}&maritalStatus=${maritalStatus || ""}&monthlyHouseholdIncome=${monthlyHouseholdIncome || ""}&occupationStatus=${occupationStatus}&religion=${religion}&caste=${caste}&cweEducation=${cweEducation}&startDate=${startDate}&endDate=${endDate}`

            const response = await axios.get(url, { headers })
            setRows(response.data)
            setPage(0);
            setisLoading(false)
        } catch (error) {
            console.log("Error in Dashboard ", error);
        }
    }
    const getActiveUsers = async () => {
        try {
            const result = await axios.get(`${apiUrl}/users/getlastform`, { headers })
            const agents = await Promise.all(result.data.result.agents.map(obj => {
                let userStatus = false
                if (obj.surveys.length < 1) {
                    return { ...obj, userStatus }
                } else {
                    userStatus = isAgentActive(obj.surveys[0].date)
                    return { ...obj, userStatus }
                }
            }))
            const fieldAgents = await Promise.all(result.data.result.fieldAgents.map(obj => {
                let userStatus = false
                if (obj.surveys.length < 1) {
                    return { ...obj, userStatus }
                } else {
                    userStatus = isAgentActive(obj.surveys[0].date)
                    return { ...obj, userStatus }
                }
            }))

            setActiveAgents({ status: true, result: { agents, fieldAgents } })
        } catch (error) {
            console.log(error)
        }
    }



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const changeHandler = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <TableContainer component={Paper}>

            {userDetail.userRole === "admin" &&
                <div className='d-flex' >
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >
                        {`Active Supervisor: ${activeAgents.result.agents.filter(obj => obj.userStatus).length}`}
                    </h6>
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >
                        {`Active Field Agents: ${activeAgents.result.fieldAgents.filter(obj => obj.userStatus).length}`}
                    </h6>
                </div>
            }
            {userDetail.userRole === "2" &&
                <>
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >
                        {`Active Field Agents: ${activeAgents.result.fieldAgents.filter(obj => userDetail.id === obj.creatorId.toString()).filter(obj => obj.userStatus).length}`}
                    </h6>
                </>
            }

            <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >Smart Filters</h6>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
            >

                <SelectInput
                    label="Filter By Marital Status"
                    name="maritalStatus"
                    options={maritalOptions}
                    value={filterData.maritalStatus}
                    changeHandler={(e) => changeHandler(e)}
                />

                <SelectInput
                    label="Filter By Income"
                    name="monthlyHouseholdIncome"
                    options={incomeOptions}
                    value={filterData.monthlyHouseholdIncome}
                    changeHandler={(e) => changeHandler(e)}
                />

                <SelectInput
                    label="Own Property"
                    name="isOwnProperty"
                    options={trueFalseOptions}
                    value={filterData.isOwnProperty}
                    changeHandler={(e) => changeHandler(e)}
                />

                <DynamicDatePicker
                    label="Filled From"
                    name="startDate"
                    defaultValue='2023-08-01'
                    minDate="2023-08-01"
                    filterData={filterData}
                    setFilterData={setFilterData}
                />

            </Stack>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
            >
                <FormControl fullWidth >
                    <SelectInput
                        label="Religion"
                        name="religion"
                        options={religionOptions}
                        value={filterData.religion}
                        changeHandler={(e) => changeHandler(e)}
                    />
                    <SelectInput
                        label="Caste"
                        name="caste"
                        options={casteOptions}
                        value={filterData.caste}
                        changeHandler={(e) => changeHandler(e)}
                    />
                </FormControl>

                <SelectInput
                    label="Occupation Status"
                    name="occupationStatus"
                    options={occupationOptios}
                    value={filterData.occupationStatus}
                    changeHandler={(e) => changeHandler(e)}
                />

                <SelectInput
                    label="Education Of Chief Wage Earner"
                    name="cweEducation"
                    options={educationalOptions}
                    value={filterData.cweEducation}
                    changeHandler={(e) => changeHandler(e)}
                />

                <DynamicDatePicker
                    label="Upto"
                    name="endDate"
                    minDate={filterData.startDate}
                    filterData={filterData}
                    setFilterData={setFilterData}
                />
            </Stack>

            {
                <>
                    {isLoading ? <Loader /> :
                        rows.data.length < 1 ?
                            <NoData msg="No Surveys Found" /> :
                            rows.status &&
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHeader tableCells={userDetail.userRole === "admin" ?
                                    [...tableCells.slice(0, 5), { label: 'Field Agent', textAlign: "center" }, ...tableCells.slice(5)] :
                                    tableCells}
                                />

                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? rows.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows.data
                                    ).map((row, i) => (
                                        <TableRow key={row._id}>
                                            <TableCell component="th" scope="row">
                                                {parseInt(i) + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.respondentName}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="center">
                                                {row.mobileNo}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="center">
                                                {row.pincode}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="center">
                                                {row.maritalStatus === 1 ? "Single" : "Married"}
                                            </TableCell>
                                            {(userDetail.userRole != '3' && userDetail.userRole != '2') &&
                                                <TableCell style={{ width: 160 }} align="center">
                                                    {capitalizeFirstLetter(row.userInfo.displayName || "admin")}
                                                </TableCell>}
                                            <TableCell align="center">
                                                {formatDate(row.date)}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button onClick={() => navigate(`/formdetail/${row._id}`)} >View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {(rows.status && rows.data.length > 10) &&
                                    <CustomTablePagination
                                        count={rows.data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                }
                                {/* {(rows.status && rows.data.length > 10) &&
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={rows.data.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                } */}
                            </Table>
                    }
                </>}
        </TableContainer>
    );
}