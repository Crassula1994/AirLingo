import styled from "@emotion/styled";
import { TextButton } from "@/components/common/button";
import successImage from "@/assets/imgs/img/Login-Success-Image.png";

function SignupOk() {
    return (
        <SignupContainer>
            <SignupBox>
                <SignupTitleWrapper>회원이 되신 것을 환영합니다!</SignupTitleWrapper>
                <SignupLine />
                <SignupSubTitleWrapper>지금 바로 여정을 떠나보세요!</SignupSubTitleWrapper>
                <SuccessImage />
                <StyledSignupOk>
                    <TextButton text="로그인 하러 가기" />
                </StyledSignupOk>
            </SignupBox>
        </SignupContainer>
    );
}
const SignupContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-contents: center;
`;
const SignupBox = styled.div`
    width: 700px;
    height: 698px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`;

const SignupTitleWrapper = styled.div`
    display: flex;
    width: 700px;
    height: 65px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: 44px;
    margin-bottom: 20px;
`;

const SignupLine = styled.div`
    width: 700px;
    height: 1px;
    flex-shrink: 0;
    background: #333;
    margin-bottom: 20px;
`;

const SignupSubTitleWrapper = styled.div`
    display: flex;
    width: 500px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px;
    margin-bottom: 40px;
`;

const SuccessImage = styled.div`
    width: 530px;
    height: 400px;
    flex-shrink: 0;
    border-radius: 20px;
    background-image: url(${successImage});
    margin-bottom: 20px;
`;

const StyledSignupOk = styled.div`
    display: flex;
    width: 200px;
    height: 50px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 40px;
`;

export default SignupOk;