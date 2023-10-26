import React, { useState, useEffect } from 'react'
import { Box, Grid, Container, Button } from "@mui/material"
import { Formik, Form } from "formik"

import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput'
import { verifyUser } from '../../../utils/functions/verifyUser';
import DataTable from '../../dataGrid/DataTable';
import { governmentSchemesOptions, categoryOptions, religionOptions, casteOptions, incomeOptions, occupationOptios, educationalOptions, trueFalseOptions, ageOptions } from '../../../utils/constants';
import SmallImageCard from '../../SmallImageCard';

const apiUrl = import.meta.env.VITE_API_URL

const SurveyForm = ({ activeStep, formId, formsDetail }) => {
    const [userId, setUserId] = useState(" ")
    let [counter, setCounter] = useState(0)

    useEffect(() => {
        const { id } = verifyUser()
        setUserId(id)
    }, [userId])
    useEffect(() => {
        setCounter(counter++)
    }, [formsDetail])

    return (
        <>
            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                        }}
                    >
                        {() => (
                            < Form >
                                <br />
                                {activeStep === 0 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Applicant Name"
                                            title="Please Enter Your Name"
                                            name="respondentName"
                                            type="text"
                                            placeholder="Please Provide Your Full Name"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail ? formsDetail.respondentName : ""}

                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Address"
                                            title="Please Enter Your Full Address"
                                            name="address"
                                            type="text"
                                            placeholder="Enter Your Full Mailing Address Here"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail ? formsDetail.address : ""}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Pincode"
                                            title="Enter Your Area Pincode"
                                            name="pincode"
                                            type="number"
                                            placeholder="454545"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail ? formsDetail.pincode : ""}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Mobile Number"
                                            title="Enter Your Mobile No"
                                            name="mobileNo"
                                            type="number"
                                            placeholder="9874563210"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail ? formsDetail.mobileNo : ""}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Can You Please Tell Me Your Marital Status?"
                                            title="Are You Married?"
                                            id="maritalStatus"
                                            name="maritalStatus"
                                            options={[{ label: "Single", value: "1" }, { label: "Married", value: "2" }]}
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail ? formsDetail.maritalStatus == 1 ? "Single" : "Married" : ""}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Can You Please Tell Me Your Occupation Status?"
                                            title="Can You Please Tell Me Your Occupation Status?"
                                            id="occupationStatus"
                                            name="occupationStatus"
                                            editable={Boolean(formsDetail)}
                                            textValue={occupationOptios.find(option => option.value == (formsDetail.occupationStatus || "")).label}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="What Is the Monthly Household Income (MHI)"
                                            title="What is the Monthly Household Income (MHI)."
                                            id="monthlyHouseholdIncome"
                                            name="monthlyHouseholdIncome"
                                            editable={Boolean(formsDetail)}
                                            textValue={incomeOptions.find(option => option.value == (formsDetail.monthlyHouseholdIncome || "")).label}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Do You Own This Property?"
                                            title="Is This Your Own Property?"
                                            name="isOwnProperty"
                                            id="isOwnProperty"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail.isOwnProperty ? "Yes" : formsDetail.isOwnProperty == 1 ? "Yes" : "No"}
                                        />
                                    </Grid>

                                    {formsDetail.location && <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Location"
                                            title=""
                                            name="location"
                                            type="text"
                                            placeholder=""
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail.location.location}
                                        />
                                        <SmallImageCard
                                            imageUrl={`${apiUrl}/uploads/${formsDetail.locationPicture || "Voter_Id_Image/no-image.png"}`}
                                            onClick={() => window.open(`${apiUrl}/uploads/${formsDetail.locationPicture || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                        />
                                    </Grid>}

                                </Grid>
                                }

                                {activeStep === 1 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="How Many Members Are There in Your Family?"
                                            title="Total Number of Members in Your Family"
                                            name="totalMembers"
                                            type="number"
                                            placeholder="Total Members"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail.totalMembers}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Religion"
                                            title="Kindly Select Your Religion"
                                            id="religion"
                                            name="religion"
                                            editable={Boolean(formsDetail)}
                                            textValue={religionOptions.find(option => option.value == formsDetail.religion).label}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Caste"
                                            title="Caste"
                                            name="caste"
                                            placeholder="Kindly Indicate Your Caste"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail.caste ? casteOptions.find(option => option.value == formsDetail.caste).label : "Not Found"}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Education Details of Chief Wage Earner (Head of the family)"
                                            title='I would now like to know the education level of the Chief Wage Earner (CWE) of your household. By Chief Wage Earner, I mean the person who contributes the maximum to the household income'
                                            id="chiefWageEarnereEducation"
                                            name="cweEducation"
                                            editable={Boolean(formsDetail)}
                                            textValue={educationalOptions.find(option => option.value == formsDetail.cweEducation).label}
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 2 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Is The Applicant a Registered Voter In This Assembly Constituency?"
                                            title="Are You a Registered Voter in This Assembly Constituency, i.e. Is Your Name Listed in the Voters List?"
                                            name="registeredVoter"
                                            id="registeredVoter"
                                            options={trueFalseOptions}
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail.registeredVoter == true ? "Yes" : "No"}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextInput
                                            label="Voter ID"
                                            name="voterIdNumber"
                                            type="number"
                                            placeholder="Please Provide Your Voter ID Number"
                                            editable={Boolean(formsDetail)}
                                            textValue={formsDetail.voterIdNumber || "N/A"}
                                        />

                                        <SmallImageCard
                                            imageUrl={`${apiUrl}/uploads/${formsDetail.voterIdImage || "Voter_Id_Image/no-image.png"}`}
                                            onClick={() => window.open(`${apiUrl}/uploads/${formsDetail.voterIdImage || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 3 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label={`Government Schemes Availed`}
                                            name="isParticipated"
                                            id="isParticipated"
                                            options={trueFalseOptions}
                                            editable={Boolean(formsDetail)}
                                            textValue={governmentSchemesOptions.find(option => option.value == formsDetail.isParticipated).label}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label="Applicant's age"
                                            title="Please Provide Your Age Based On Your Last Birthday."
                                            id="birthdayDate"
                                            name="birthdayDate"
                                            editable={Boolean(formsDetail)}
                                            textValue={ageOptions.find(option => option.value == (formsDetail.birthdayDate || "")).label}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <SelectInput
                                            label={`What Category Do You Fall Under?`}
                                            name="categoryFallUnder"
                                            id="categoryFallUnder"
                                            options={categoryOptions}
                                            editable={Boolean(formsDetail)}
                                            textValue={categoryOptions.find(option => option.value == formsDetail.isParticipated).label}
                                        />
                                    </Grid>
                                </Grid>}

                                {activeStep === 4 && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <DataTable formsDetail={formsDetail.ageGroupOfMembers} />
                                </Grid>}

                            </Form>
                        )}

                    </Formik >
                </Box>
            </Container >
        </>
    )
}

export default SurveyForm