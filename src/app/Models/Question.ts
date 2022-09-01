export interface Question{
    question_Id?: number;
    question_No: number;
    subject_Id: number;
    test_Id: number;
    question_marks: number;
    question_Statement: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    correct_Answer: string;
}