import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loan from './Loan'
import Investment from './Investment'
import Info from './Info'
import About from './About'
import Notice from './Notice'
import Faq from './Faq'
import Login from './Login'
import Signup from './Signup'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css'
import axios from 'axios'
import styled from "styled-components";
import numeral from 'numeral';
import dayjs from 'dayjs';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Progress = styled.div`
    width: 95%;
    height: 5px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
`;

const Dealt = styled.div`
    height: 100%;
    background-color: #00999d;
    width: ${(props) => `${Math.floor((props.investAmount / props.amount) * 100)}%`};
`;
const Status = styled.div`
    font-size:20px;
`;
const SummeryNum = styled.div`
    font-size:40px;
    color: #00999d;
    font-weight: 500;
`;
const BoxNum = styled.div`
    font-size:40px;
    color: black;
    font-weight:500;
`;
const FooterLinks = styled.div`
    width:fit-content;
    cursor: pointer;
    padding-bottom: 24px;
  &:hover {
    color: #24231f;
    transition: all 0.34s ease-in;
`;
const FooterCustomer = styled.div`
    color: #6a6a6a;
    font: normal normal 16px / 18px NanumSquare;
    padding-bottom: 16px;
`;




export default function Home() {
    const [notice, setNotice] = useState([]);
    const [card, setCard] = useState([]);
    const [status, setStatus] = useState();
    const [story, setStory] = useState([]);
    const [popup, setPopup] = useState();

    const numbers = (num) => {
        return numeral(num).format('0,0');
    }

    const finNumbers = (num) => {
        if (num >= 1e8) {
            return `${numeral(num / 1e8).format('0.0')}억`;
        } else if (num >= 1e4) {
            return `${numeral(num / 1e4).format('0.0')}만`;
        } else {
            return numeral(num).format('0,0');
        }
    }

    const date = (d) => { return dayjs(d).format('YYYY.MM.DD') };

    useEffect(() => {
        async function fetchAll() {
            try {
                const noticeRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/common/onlyNoticePreview?q=1748095980882`);
                setNotice(noticeRes.data.body);

                const cardRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/list?limit=6&q=1748095980883`);
                setCard(cardRes.data.body.products);

                const statusRes = await axios.get(`${process.env.REACT_APP_SERVER_URL_WR}/loan/main/report?q=1749982044781`);
                setStatus(statusRes.data);

                const storyRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/common/mediaNotice?q=1749829498644`);
                setStory(storyRes.data.body);

                const popupRes = await axios.get(`${process.env.REACT_APP_SERVER_URL_WR}/admin/base/user/notice?q=1751297412231`);
                setPopup(popupRes.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAll();
    }, []);
    
    return (
        <div className='home'>
            <section className='main'>
                <div>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        className="main-swiper"
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        speed={1500}
                        pagination={{
                            el: '.main-swiper-pagination',
                            type: 'bullets',
                            clickable: true,
                        }}
                    >
                        <SwiperSlide>
                            <img
                                src="https://v2.cocktailfunding.com/static/media/app_down.15cdbad0.png"
                                className="main-img"
                                alt="Main"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src='https://v2.cocktailfunding.com/static/media/banner_2024result_1.f70ba21e.png'
                                className='main-img'
                                alt='Main'
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src='https://v2.cocktailfunding.com/static/media/banner_2024result_2.bd535f23.png'
                                className='main-img'
                                alt='Main'
                            />
                        </SwiperSlide>
                    </Swiper>
                    <div className='main-swiper-pagination'></div>

                    <div className='notice-swiper-wrapper'>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            className="notice-swiper"
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            navigation={{
                                nextEl: '.button-next',
                                prevEl: '.button-prev'
                            }}
                            speed={1500}
                        >
                            {notice.map((nt) => (
                                <SwiperSlide className='notice-wrapper'>
                                    <div className='notice-notice'>공지</div>
                                    <div className='notice-title'>{nt.title}{date(nt.updated_at)}</div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="handle-button">
                            <div className='button-prev'>
                                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARhJREFUeNrs2kENwkAQheECBtZBkVAZyAAHHHFDLdQFNioBB2yTJvQCt515D/4/aSg9bb7jzHYdEREREREREREREf1Dfd9flyfzDAdhnHv9udXnVEp51h4Z59gL45wVzrIzwBnneb4AJIgjBaSIIwOkiiMBpIyTDqSOkwrkgJMG5IKTAuSEEw7khhMK5IgTBuSKEwLkjNMcyB2n6bhjHXRZ4zQF+pWaTRSXCWAp5Vhfh/XTsPyv3yeA3kiTO1LzmbQ7UsjQ3hkpbKvhihS69nFECt+LuSGlLA6dkNI2qy5IqatnB6T03bw6ksTlBWUkmdsdqkhS118UkeTuB31A4n7QtnWwNnb0PYUreERERERERERERLTpJcAAgDPTO5QYGC4AAAAASUVORK5CYII=' className='prev' />
                            </div>
                            <div className='button-next'>
                                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQpJREFUeNrs2sEJg0AQQFGTbcAOTAmWZDpIR0kLdpE2LGErSBQWEgLxFuZP+B8WdC8OD/Gw2HVmZmZmZmZmZmZm9g8Nw3DZlhLfcR5tXalzHiFzTFSkEvXgWuu97/vTejm2rXG7X/dngV5IMx2pRA9ARyqEIchIhfIqU5EwQFQkFBARCQdEQ0ICkZCwQBQkNBABCQ8UjZQCKBIpDVAUUiqgHaS6nQ784nnHznY7ZBu4HaxNb1u3ZVnOAgXgpAKKwEkDFIWTAigSBw8UjYMGIuBggSg4SCASDg6IhoMCIuJggKg4CCAyTjgQHSf0uKP9OIXGCQX6CIlD+Dj7C56ZmZmZmZmZmVmmngIMAFOQ0UFLLivGAAAAAElFTkSuQmCC' className='next'></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='leader-invest'>
                <div className='invest-wapper'>
                    <div className='invest-title'>
                        <div className='invest-header'>리더를 위한 쉬운 투자</div>
                        <div className='invest-card-swiper-pagination'></div>
                        {card.length > 0 &&
                            <Swiper
                                className='invest-card-swiper'
                                slidesPerView={3}
                                spaceBetween={30}
                                loop={true}
                                pagination={{
                                    el: '.invest-card-swiper-pagination',
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                            // breakpoints={}
                            >
                                {card.map((cd) => (
                                    <SwiperSlide className='invest-card-wrapper'>
                                        <div className='invest-card-thumbnail'>
                                            <div className='invest-card'>
                                                <div>{cd.status}</div>
                                                {cd.product_tag}
                                                <img src='../IMG_TOWER.png' alt='card-img' height={'70%'} width={'15%'}></img>
                                            </div>
                                        </div>
                                        <div>{cd.name}</div>
                                        <div>{cd.title}</div>
                                        <div>
                                            <div>{cd.interest_rate} | {cd.term} | {cd.investment_category_name}</div>
                                            {cd.opened_at}
                                        </div>
                                        <Progress className='progress-bar'>
                                            <Dealt amount={cd.amount} investAmount={cd.invest_amount} />
                                        </Progress>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }
                        <div className='invest-more' onClick={() => { }}>더보기</div>
                    </div>
                    <div className='kakao-wrapper'>
                        <div className='kakao-channel-wrapper'>
                            <div className='kakao-text'>
                                <h2 style={{ fontSize: '40px', fontWeight: '600', margin: '0' }}>리더를 위한 상품 알림</h2>
                                <h2 style={{ margin: '0' }}>칵테일펀딩 채널 추가</h2>
                            </div>
                            <img className='kakao-img' src='https://v2.cocktailfunding.com/static/media/middle_banner_kakao.e74027ab.png' />
                        </div>
                        <div className='invest-limit-wrapper'>
                            <div className='invest-limit-text'>
                                <h2 style={{ fontSize: '40px', fontWeight: '600', margin: '0' }}>내 투자한도는?</h2>
                                <h2 style={{ margin: '0' }}>개인 소득적격 법인 투자자</h2>
                            </div>
                            <img className='invest-limit-img' src='https://v2.cocktailfunding.com/static/media/middle_banner_limit.d461ed2f.png' />
                        </div>
                    </div>
                </div>
            </section >

            <section className='invest-status'>
                <div className='status-wrapper'>
                    {status && (
                        <div className='status-header' style={{ fontSize: '30px', margin: '30px 0' }}>칵테일 펀딩 투자 현황 {status.baseDate}
                            <div className='status-summery'>
                                칵테일펀딩을 통해<SummeryNum>{numbers(status.countUser)}명</SummeryNum>의 회원이
                                <SummeryNum>{finNumbers(status.investAmount)}원</SummeryNum>을 투자하여
                                <SummeryNum>{finNumbers(status.investInterest)}원</SummeryNum>의 수익을 경험하셨습니다.
                            </div>
                            <div className='status-summery-box'>
                                <div className='status-box'>
                                    <Status>
                                        누적 대출액
                                    </Status>
                                    <BoxNum>
                                        {finNumbers(status.loanAmount)}원
                                    </BoxNum>
                                </div>
                                <div className='status-box'>
                                    <Status>
                                        총 상환금액
                                    </Status>
                                    <BoxNum>
                                        {finNumbers(status.loanBalance)}원
                                    </BoxNum>
                                </div>
                                <div className='status-box'>
                                    <Status>
                                        대출 잔액
                                    </Status>
                                    <BoxNum>
                                        {finNumbers(status.totalReturnAmount)}원
                                    </BoxNum>
                                </div>
                                <div className='status-box'>
                                    <Status>
                                        평균 수익률
                                    </Status>
                                    <BoxNum>
                                        {numeral(status.avgInterestRate).format('0.00')}
                                    </BoxNum>
                                    %
                                </div>
                            </div>
                        </div>)}
                    <div className='status-info'></div>
                    <div className='status-more'>공시자료 상세보기</div>
                </div>
            </section>

            <section className='cocktail-story'>
                <div style={{ fontSize: '30px', margin: '30px 0' }}>칵테일 펀딩 이야기</div>
                <div className='story-wrapper'>
                    <div className='story-swiper-pagination'></div>
                    <Swiper
                        modules={[Pagination]}
                        className='story-swiper'
                        spaceBetween={30}
                        slidesPerView={3}
                        pagination={{
                            el: '.story-swiper-pagination',
                            clickable: true
                        }}
                    >
                        {story.map((story) => (
                            <SwiperSlide >
                                <div className='story-box'>
                                    <div className='story-title'>{story.title}</div>
                                    <div className='story-body-wrapper'>
                                        <p className='story-body'>
                                            {story.body.replace(/<[^>]+>/g, '')}
                                        </p>
                                        <div className='story-more'>더보기</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <footer className='footer'>
                <div className='footer-wrapper'>
                    <div className='footer-first'>
                        <div className='footer-infos-logo'>
                            <img src='' />
                        </div>
                        <div className='footer-links-div'>
                            <FooterLinks>서비스이용약관</FooterLinks>
                            <FooterLinks>개인정보취급방침</FooterLinks>
                            <FooterLinks>온라인연계투자약관</FooterLinks>
                            <FooterLinks>온라인연계대출약관</FooterLinks>
                            <FooterLinks>전자금융거래이용약관</FooterLinks>
                            <FooterLinks>고객권리안내문</FooterLinks>
                            <FooterLinks>신용정보활용체제</FooterLinks>
                        </div>
                        <div className='footer-customer-center'>
                            <FooterCustomer></FooterCustomer>
                            <FooterCustomer></FooterCustomer>
                            <FooterCustomer></FooterCustomer>
                            <FooterCustomer></FooterCustomer>
                        </div>
                    </div>
                    <div className='footer-second'></div>
                </div>
            </footer>

            <Routes>
                <Route path='/loan' element={<Loan />} />
                <Route path='/investment' element={<Investment />} />
                <Route path='/info' element={<Info />} />
                <Route path='/notice' element={<Notice />} />
                <Route path='/about' element={<About />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div >
    )
}
