export interface Response{
    response_Id?: number;
    user_Id: number;
    test_Id: number;
    question_Id: number;
    user_Response?: string;
    correct_Wrong: boolean;
}