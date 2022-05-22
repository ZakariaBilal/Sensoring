import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subjects: [],
    subject: null,
    loader: false,
    error: false
}

const SubjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        //Get ALL
        startGetSubjects(state) {
            state.loader = true;
        },
        getSubjectsSuccess(state, action) {
            state.loader = false;
            state.subjects = action.payload
        },
        getSubjectsFailure(state) {
            state.subjects = [];
            state.loader = false;
            state.error = true;
        },
        // Get One
        startGetSubject(state) {
            state.loader = true
        },
        getSubjectSuccess(state, action) {
            state.loader = false;
            state.subject = action.payload
        },
        getSubjectFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Insert
        startInsertSubject(state) {
            state.loader = true
        },
        insertSubjectSuccess(state, action) {
            state.loader = false;
            state.subject = action.payload
        },
        insertSubjectFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Update
        startUpdateSubject(state) {
            state.loader = true
        },
        updateSubjectSuccess(state, action) {
            state.loader = false;
            state.subject = action.payload
        },
        updateSubjectFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Delete
        startDeleteSubject(state) {
            state.loader = true
        },
        deleteSubjectSuccess(state, action) {
            state.loader = false;
            state.subjects = state.subjects.filter((subject) => (subject._id != action.payload._id));
        },
        deleteSubjectFailure(state) {
            state.loader = false;
            state.error = true;
        },
    },
});

export const { startGetSubjects,
    getSubjectsSuccess,
    getSubjectsFailure,
    startGetSubject,
    getSubjectSuccess,
    getSubjectFailure,
    startInsertSubject,
    insertSubjectSuccess,
    insertSubjectFailure,
    startUpdateSubject,
    updateSubjectSuccess,
    updateSubjectFailure,
    startDeleteSubject,
    deleteSubjectSuccess,
    deleteSubjectFailure } = SubjectSlice.actions;

export default SubjectSlice.reducer;
