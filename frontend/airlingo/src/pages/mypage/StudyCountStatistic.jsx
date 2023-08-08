/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "@emotion/styled";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Red } from "@/assets/icons/language-red-icon.svg";
import { ReactComponent as Green } from "@/assets/icons/language-green-icon.svg";
import { ReactComponent as Orange } from "@/assets/icons/language-orange-icon.svg";
import { ReactComponent as Purlple } from "@/assets/icons/language-purple-icon.svg";
import { ReactComponent as Blue } from "@/assets/icons/language-blue-icon.svg";
import { ReactComponent as YelloW } from "@/assets/icons/language-yellow-icon.svg";
import { getRecordStatistic } from "@/api";
import { selectUser } from "@/features/User/UserSlice";

function StudyCountStatistic() {
    const [data, setData] = useState(null);
    const [totalStudyNumber, setTotalStudyNumber] = useState(0);
    const { userId } = useSelector(selectUser);
    const colors = {
        한국어: "#E96060",
        영어: "#35B1C9",
        일본어: "#EBA004",
        프랑스어: "#B06DAD",
        중국어: "#BADF55",
        스페인어: "#EBC83D",
        // 필요한 만큼 추가
    };

    const centerTextPlugin = {
        id: "centerText",
        afterDraw: (chart) => {
            const { ctx } = chart;
            const { width, height } = chart;
            const center = {
                x: width / 2,
                y: height / 2,
            };

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "600 45px Pretendard";
            ctx.fillStyle = "#000";
            ctx.fillText(`${totalStudyNumber}회`, center.x, center.y);
        },
    };

    const labelsPlugin = {
        id: "labels",
        afterDatasetsDraw: (chart) => {
            const { ctx } = chart;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFF";
            ctx.font = "700 18px Pretendard";

            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                    // 위치 계산
                    const dataPercentage = dataset.data[index];
                    const { startAngle } = element;
                    const { endAngle } = element;
                    const midAngle = startAngle + (endAngle - startAngle) / 2;
                    const radius = (element.outerRadius + element.innerRadius) / 2;
                    const x = radius * Math.cos(midAngle);
                    const y = radius * Math.sin(midAngle);

                    // 레이블 텍스트 쓰기
                    ctx.fillText(chart.data.labels[index], element.x + x, element.y + y - 10); // 레이블은 조금 위로

                    // 퍼센트 텍스트 쓰기
                    ctx.fillText(`${dataPercentage}%`, element.x + x, element.y + y + 10); // 퍼센트는 조금 아래로
                });
            });
        },
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const getRecordStatisticFunction = async () => {
        console.log(userId);
        await getRecordStatistic({
            responseFunc: {
                200: (response) => {
                    console.log("통계 데이터 가져오기 성공");
                    console.log(response.data.data.numberResponse);
                    const { languageNumberResponseDtoList } = response.data.data.numberResponse;
                    console.log(languageNumberResponseDtoList);
                    const chartData = {
                        labels: languageNumberResponseDtoList.map((item) => item.languageName),
                        datasets: [
                            {
                                data: languageNumberResponseDtoList.map((item) => item.percent),
                                backgroundColor: languageNumberResponseDtoList.map(
                                    (item) => colors[item.languageName],
                                ),
                            },
                        ],
                    };

                    setData(chartData);
                    console.log(chartData);
                    setTotalStudyNumber(response.data.data.numberResponse.totalStudyNumber);
                    console.log(totalStudyNumber);
                },
                400: () => {
                    console.log("통계 데이터 가져오기 실패");
                },
            },
            data: userId,
        });
    };

    useEffect(() => {
        getRecordStatisticFunction();
    }, []);

    return (
        <PageLayout>
            <Title>대화 횟수 분석</Title>
            <SubTitle>랭커들과 대화한 횟수는 총 몇 번일까요?</SubTitle>
            <ChartContainer>
                {data ? (
                    <Doughnut
                        data={data}
                        options={options}
                        plugins={[centerTextPlugin, labelsPlugin]}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </ChartContainer>
            <LanguageContainer>
                <LanguageRow>
                    <LanguageBox>
                        <RedIcon />
                        <LanguageText>한국어</LanguageText>
                    </LanguageBox>
                    <LanguageBox>
                        <BlueIcon />
                        <LanguageText>영어</LanguageText>
                    </LanguageBox>
                    <LanguageBox>
                        <OrangeIcon />
                        <LanguageText>일본어</LanguageText>
                    </LanguageBox>
                </LanguageRow>
                <LanguageRow>
                    <LanguageBox>
                        <PurlpleIcon />
                        <LanguageText>프랑스어</LanguageText>
                    </LanguageBox>
                    <LanguageBox>
                        <GreenIcon />
                        <LanguageText>중국어</LanguageText>
                    </LanguageBox>
                    <LanguageBox>
                        <YellowIcon />
                        <LanguageText>스페인어</LanguageText>
                    </LanguageBox>
                </LanguageRow>
            </LanguageContainer>
        </PageLayout>
    );
}

const PageLayout = styled.div`
    position: relative;
    width: 500px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
`;

const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 40px;
`;

const SubTitle = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const ChartContainer = styled.div`
    display: flex;
    width: 350px;
    height: 350px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 70px;
    margin-top: 70px;
`;

const LanguageContainer = styled.div`
    display: flex;
    width: 400px;
    height: 82px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const LanguageRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
`;

const LanguageBox = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const LanguageText = styled.span`
    display: flex;
    width: 100px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const RedIcon = styled(Red)`
    width: 15px;
    height: 15px;
`;

const GreenIcon = styled(Green)`
    width: 15px;
    height: 15px;
`;

const BlueIcon = styled(Blue)`
    width: 15px;
    height: 15px;
`;

const PurlpleIcon = styled(Purlple)`
    width: 15px;
    height: 15px;
`;

const YellowIcon = styled(YelloW)`
    width: 15px;
    height: 15px;
`;

const OrangeIcon = styled(Orange)`
    width: 15px;
    height: 15px;
`;

export default StudyCountStatistic;
