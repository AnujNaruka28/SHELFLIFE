import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "../lib/store";
import { getMembers } from "../lib/actions/membersAction";
import { Chip, Paper } from '@mui/material';
const useAppDispatch = () => useDispatch<AppDispatch>();
const MembersPage = () => {

    const {members} = useSelector((state: any) => state.members);
    const dispatch = useAppDispatch();
    
    useEffect( () => {
        dispatch(getMembers())
    },[])
    return (
        <Swiper
        direction="vertical"
        loop={true}
        scrollbar={{
            draggable: true
        }}
        navigation={{
            enabled: true
        }}
        slidesPerView={2}
        spaceBetween={20}
        modules={[Navigation]}
        style={{
            width: '100%',
            height: '100%',
            padding: '0 40px',
            '--swiper-navigation-size': '24px',
            '--swiper-navigation-color': '#000',
        } as React.CSSProperties}>
            {
                members.map((member: any,index: number) => (
                    <SwiperSlide key={index}>
                        <Paper
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            fontWeight: 'medium',
                            borderRadius: '1rem',
                            padding: '2rem',
                            gap: '1rem'
                        }}
                        >
                            <img src={member.profileImage?.secure_url || ""} alt={member.name} 
                            className="w-32 h-32 rounded-full"
                            loading='lazy'/>    
                            
                            <div className="flex gap-2 items-center font-medium text-lg">
                                {member.name}
                                <span>
                                    <Chip label={member?.role} sx={{
                                        color: "#212022"
                                    }}/> 
                                </span>
                            </div>
                        </Paper>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default MembersPage;
