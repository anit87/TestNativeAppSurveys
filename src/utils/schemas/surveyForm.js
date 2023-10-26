import * as Yup from 'yup'

export const surveyFormSchema = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    residingYears: Yup.number(),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    stayingMembers: Yup.number(),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string()
        .required('Please enter the required value.'),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    respondentEducation: Yup.string(),
    isParticipated: Yup.string()
        .required('Please enter the required value.'),
    categoryFallUnder: Yup.string()
        .required('Please enter the required value.'),
    birthdayDate: Yup.string()
        .required('Please enter the required value.'),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),
    ageGroupOfMembers: Yup.array()
        .required('Please enter the required value.'),
    ageGroupOfMembers: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(2, 'Too Short').required('Required'),
                age: Yup.number().required('Required'),
                gender: Yup.string().required('Required'),
                assembly: Yup.string(),
                voterId: Yup.string().required('Required'),
                voterIdNum: Yup.string()
            })
        ).required('Required'),
    assemblyConstituencyMembers: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(2, 'Too Short'),
                age: Yup.number(),
                gender: Yup.string(),
                assemblyName: Yup.string().min(2, 'Too Short'),
            })
        ),
    voterIDsList: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(2, 'Too Short'),
                age: Yup.number(),
                gender: Yup.string(),
                assemblyName: Yup.string().min(2, 'Too Short'),
            })
        ),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),

});
export const surveyFormSchemaStep0 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    residingYears: Yup.number(),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),

});
export const surveyFormSchemaStep1 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    residingYears: Yup.number(),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    stayingMembers: Yup.number(),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string()
        .required('Please enter the required value.'),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),

});

export const surveyFormSchemaStep2 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    residingYears: Yup.number(),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    stayingMembers: Yup.number(),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string()
        .required('Please enter the required value.'),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    respondentEducation: Yup.string(),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),

});
export const surveyFormSchemaStep3 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    residingYears: Yup.number(),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    stayingMembers: Yup.number(),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string()
        .required('Please enter the required value.'),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    respondentEducation: Yup.string(),
    isParticipated: Yup.string()
        .required('Please enter the required value.'),
    categoryFallUnder: Yup.string()
        .required('Please enter the required value.'),
    birthdayDate: Yup.string()
        .required('Please enter the required value.'),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),

});
