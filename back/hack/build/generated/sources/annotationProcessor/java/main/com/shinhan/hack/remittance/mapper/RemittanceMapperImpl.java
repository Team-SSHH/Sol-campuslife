package com.shinhan.hack.remittance.mapper;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.entity.DutchPay;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-16T23:23:23+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 11.0.0.1 (Oracle Corporation)"
)
@Component
public class RemittanceMapperImpl implements RemittanceMapper {

    @Override
    public RemittanceDto.Response toResponseDto(Student student) {
        if ( student == null ) {
            return null;
        }

        RemittanceDto.Response.ResponseBuilder response = RemittanceDto.Response.builder();

        response.phoneId( student.getPhoneId() );
        response.balance( student.getBalance() );

        return response.build();
    }

    @Override
    public List<DutchPayDto.Response> toDutchResponseDto(List<DutchPay> DutchPay) {
        if ( DutchPay == null ) {
            return null;
        }

        List<DutchPayDto.Response> list = new ArrayList<DutchPayDto.Response>( DutchPay.size() );
        for ( DutchPay dutchPay : DutchPay ) {
            list.add( dutchPayToResponse( dutchPay ) );
        }

        return list;
    }

    @Override
    public RemittanceDto.update toUpdateFromSend(DutchPayDetailDto.send send) {
        if ( send == null ) {
            return null;
        }

        RemittanceDto.update.updateBuilder update = RemittanceDto.update.builder();

        update.studentId( send.getStudentId() );
        update.friendId( send.getFriendId() );

        return update.build();
    }

    @Override
    public DutchPayDetailDto.Response toDetailResponseDto(DutchPayDetail dutchPayDetail) {
        if ( dutchPayDetail == null ) {
            return null;
        }

        DutchPayDetailDto.Response.ResponseBuilder response = DutchPayDetailDto.Response.builder();

        response.dutchDetailId( dutchPayDetail.getDutchDetailId() );
        response.dutchAmount( dutchPayDetail.getDutchAmount() );
        response.remittanceState( dutchPayDetail.getRemittanceState() );
        response.remittanceTime( dutchPayDetail.getRemittanceTime() );
        response.friendId( dutchPayDetail.getFriendId() );

        return response.build();
    }

    protected DutchPayDto.Response dutchPayToResponse(DutchPay dutchPay) {
        if ( dutchPay == null ) {
            return null;
        }

        DutchPayDto.Response.ResponseBuilder response = DutchPayDto.Response.builder();

        response.dutchId( dutchPay.getDutchId() );
        response.amount( dutchPay.getAmount() );
        response.dutchState( dutchPay.getDutchState() );
        response.number( dutchPay.getNumber() );
        response.requestTime( dutchPay.getRequestTime() );

        return response.build();
    }
}
