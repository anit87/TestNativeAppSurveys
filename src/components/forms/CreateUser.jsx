import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Formik, Form, useFormikContext } from "formik"
import { useDispatch, useSelector } from 'react-redux'

import { signUpSchema, updateUserSchema } from "../../utils/schemas/auth"
import { fetchAuthData } from '../../features/auth/authSlice'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import Alert from '../Alert'
import { verifyUser } from '../../utils/functions/verifyUser'
import axios from 'axios'
import { userToUpdate as userToUpdateAction } from '../../features/auth/authSlice'
import { constituencyOptions } from '../../utils/constants'


const apiUrl = `/auth/signup`
const serverURL = import.meta.env.VITE_API_URL + '/users'

const roles = [
    {
        label: "Supervisor",
        value: "2"
    },
    {
        label: "Field Agent",
        value: "3"
    }
]
const userRoleOp = [{ label: "User", value: "user" }]
const fieldRoleOp = [{ label: "Field User", value: "fielduser" }]



const CreateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams();
    // const { values, submitForm } = useFormikContext();
    const { data, error, loading, msg, token, singleUser } = useSelector(state => state.auth)
    const [userRole, setUserRole] = useState("")
    const [agentsList, setAgentsList] = useState([])
    const [userToUpdate, setUserToUpdate] = useState({
        status: false, data: {}
    })
    const [alert, setAlert] = useState(false);
    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }
    useEffect(() => {
        const { userRole } = verifyUser(token)
        setUserRole(userRole)
    }, [userRole])

    useEffect(() => {
        if (id) {
            userToUpdateFn()
        }
        if (!id) {
            allAgents()
        }
    }, [])
    // console.log("create user , UserRole", userRole);



    const allAgents = async () => {
        const resp = await axios.get(serverURL + '/agentslist')
        const data = resp.data.data
        const newArr = data.map(obj => {
            return { label: obj.displayName, value: obj._id }
        })
        setAgentsList(newArr)
    }
    const userToUpdateFn = async () => {
        try {
            const resp = await axios.get(serverURL + `/getuser/${id}`)
            dispatch(userToUpdateAction(resp.data.data))
            // setUserToUpdate(resp.data)
        } catch (error) {
            console.log(error);
        }
    }

    const initialValues = {
        displayName: id ? singleUser.displayName : '',
        email: id ? singleUser.email : '',
        password: '',
        confirmPassword: '',
        phoneNumber: id ? singleUser.phoneNumber : '',
        boothNumber: id ? singleUser.boothNumber : '',
        userRole: id ? singleUser.userRole : "2",
        reportingAgent: ""
    }
    // console.log("singleUser", singleUser);
    return (
        <>
            <Alert open={alert} type={error ? "error" : "info"} msg={msg} onClose={() => setAlert(false)} />

            <Formik
                initialValues={initialValues}
                validationSchema={id ? updateUserSchema : signUpSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (userRole !== 'admin') {
                        values.userRole = '3'
                    }

                    dispatch(fetchAuthData(
                        {
                            apiUrl: import.meta.env.VITE_API_URL + apiUrl,
                            bodyOfRequest: id ? { ...values, id } : values,
                            method: "POST"
                        }
                    ));
                    alertfn()
                    setSubmitting(false);
                    resetForm()
                }}
            >
                {(formik) => (
                    <Box
                        sx={{
                            my: 1,
                            mx: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                        }}
                    >
                        <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Users</h6>
                        {/* {console.log("formik ", formik)} */}

                        <Box sx={{ mt: 1 }} >
                            <Form>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Name"
                                            name="displayName"
                                            type="text"
                                            placeholder="Enter Your Name"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Your Email"
                                            value={formik.values.email}
                                            onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                        />
                                    </Grid>
                                    {!id &&
                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="Password"
                                                name="password"
                                                type="password"
                                                placeholder="*******"
                                            />
                                        </Grid>
                                    }
                                    {!id &&
                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="*******"
                                            />
                                        </Grid>
                                    }
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Phone Number"
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="Enter Phone Number"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        {userRole === 'admin' ?
                                            <SelectInput
                                                label="Choose Role"
                                                title="Choose Role for the new user"
                                                name="userRole"
                                                id="userRole"
                                                options={roles}
                                                disabled={Boolean(id)}
                                            /> :
                                            <SelectInput
                                                label="Choose Role"
                                                title="Choose Role for the new user"
                                                name="userRole"
                                                id="userRole"
                                                options={roles}
                                                value='3'
                                                disabled={true}
                                            />
                                        }
                                    </Grid>

                                    {userRole === 'admin' && formik.values.userRole === '3' &&
                                        <Grid item md={6} xs={12}>
                                            {!id &&
                                                <SelectInput
                                                    label="Choose Agent"
                                                    name="reportingAgent"
                                                    id="reportingAgent"
                                                    options={agentsList}
                                                />
                                            }
                                        </Grid>
                                    }

                                   { userRole === '2' &&
                                    <>
                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="Booth Number"
                                                name="boothNumber"
                                                type="text"
                                                placeholder="Enter Booth Number"
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="Constituency"
                                                title="Choose Constituency"
                                                name="constituency"
                                                id="constituency"
                                                options={constituencyOptions}
                                            />
                                        </Grid>
                                    </>}

                                </Grid>
                                <Button variant='contained' type='submit' sx={{ mt: 3, mb: 2, mr: 2 }} >{id ? "Update" : "Create"}</Button>
                                <Button variant='contained' type='button' onClick={() => navigate("/allusers")} sx={{ mt: 3, mb: 2 }} >Cancel</Button>
                            </Form>
                        </Box>
                    </Box>
                )}
            </Formik >
        </>
    )
}

export default CreateUser

