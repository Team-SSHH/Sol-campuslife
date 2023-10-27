<h1 align="center"> 대학생들의 즐거운 캠퍼스 라이프를 위한 'Sol campuslife'</h1>

## 📝 목차

[프로젝트 개요](#item-one)

[팀원 정보 및 업무 분담 내역](#item-two)

[기술 스택](#item-three)

[데이터 베이스 모델링 (ERD)](#item-four)

[프로젝트 구조도](#item-five)

[서비스 구현 화면](#item-six)

- [1)Home](#item-seven)
- [2)송금](#item-eight)
- [3)더치페이](#item-nine)
- [4)학생증 저장](#item-ten)
- [5)환율 및 환전](#item-eleven)
- [6)소비로그](#item-twelve)
- [7)로그추천](#item-thirteen)
- [8)영업점찾기](#item-fourteen)
- [9)깐부찾기](#item-fifteen)

[느낀 점](#item-end)

<a id="item-one"></a>

## 🗓프로젝트 개요

- **진행 기간 : 2023.09.01 ~ 2023.09.17**
- **목표** 
  - 대학생들의 캠퍼스 주변 소비생활의 편의를 증진시켜주는 플랫폼 개발

<a id="item-two"></a>

## 팀원 정보 및 업무 분담 내역

- 김동현 : PM, 클라이언트 개발, 계좌 거래내역 조회 API를 활용한 데이터 분석

- 윤자현 : 클라이언트 개발, 사용자 인터페이스 및 사용자 경험 디자인

- 이상훈 : 백엔드 개발, API 연동 및 서버 사이드 로직 구현

- 최상익 : 클라이언트, 백엔드 개발, API 연동 및 서버 사이드 로직 구현

<a id="item-three"></a> 

## 기술 스택

<a id="item-four"></a>

## 데이터 베이스 모델링 (ERD)

<a id="item-five"></a>

### 프로젝트 구조도

<details>
<summary>back-end</summary>

```
📦hack
 ┣ 📂.gradle
 ┃ ┣ 📂8.2.1
 ┃ ┃ ┣ 📂checksums
 ┃ ┃ ┃ ┗ 📜checksums.lock
 ┃ ┃ ┣ 📂dependencies-accessors
 ┃ ┃ ┃ ┣ 📜dependencies-accessors.lock
 ┃ ┃ ┃ ┗ 📜gc.properties
 ┃ ┃ ┣ 📂executionHistory
 ┃ ┃ ┃ ┣ 📜executionHistory.bin
 ┃ ┃ ┃ ┗ 📜executionHistory.lock
 ┃ ┃ ┣ 📂fileChanges
 ┃ ┃ ┃ ┗ 📜last-build.bin
 ┃ ┃ ┣ 📂fileHashes
 ┃ ┃ ┃ ┣ 📜fileHashes.bin
 ┃ ┃ ┃ ┣ 📜fileHashes.lock
 ┃ ┃ ┃ ┗ 📜resourceHashesCache.bin
 ┃ ┃ ┗ 📜gc.properties
 ┃ ┣ 📂buildOutputCleanup
 ┃ ┃ ┣ 📜buildOutputCleanup.lock
 ┃ ┃ ┣ 📜cache.properties
 ┃ ┃ ┗ 📜outputFiles.bin
 ┃ ┣ 📂vcs-1
 ┃ ┃ ┗ 📜gc.properties
 ┃ ┗ 📜file-system.probe
 ┣ 📂.idea
 ┃ ┣ 📂modules
 ┃ ┃ ┗ 📜hack.main.iml
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜compiler.xml
 ┃ ┣ 📜dataSources.xml
 ┃ ┣ 📜gradle.xml
 ┃ ┣ 📜jarRepositories.xml
 ┃ ┣ 📜misc.xml
 ┃ ┣ 📜modules.xml
 ┃ ┗ 📜vcs.xml
 ┣ 📂build
 ┃ ┣ 📂classes
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂hack
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryDto$Post$PostBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryDto$Post.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryDto$Update$UpdateBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryDto$Update.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Category$CategoryBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Category.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryMapper.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryMapperImpl.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomException.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorCode.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse$ErrorResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GlobalExceptionHandler.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂friends
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FriendsDto$FriendsDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Friends$FriendsBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Friends.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FriendMapper.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendMapperImpl.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂history
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HistoryController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto$DailyConsumptionDto$DailyConsumptionDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto$DailyConsumptionDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto$StatisticsSummary.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto$Summary.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoDocument.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜KakaoLocalResponse.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜History$HistoryBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜History.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HistoryRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HistoryService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂initializer
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TransactionDataInitializer.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Location
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂contoller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationContoller.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$friend$friendBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$friend.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$SitePost$SitePostBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$SitePost.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$StatePost$StatePostBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationDto$StatePost.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationMapper.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationMapperImpl.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationApiController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationRequestDto$FCMNotificationRequestDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationRequestDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentCategoryDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentCategoryDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentCategoryDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto$getBalance$getBalanceBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto$getBalance.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto$Post$PostBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto$Post.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜StudentLocation.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Student$StudentBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Student.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginMapper.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginMapperImpl.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂remittance
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto$consent$consentBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto$consent.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto$send$sendBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto$send.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDto$Post$PostBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDto$Post.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationRequestDto$FCMNotificationRequestDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationRequestDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RemittanceDto$Response$ResponseBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RemittanceDto$Response.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RemittanceDto$update$updateBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RemittanceDto$update.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPay$DutchPayBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPay.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetail$DutchPayDetailBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DutchPayDetail.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RemittanceMapper.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceMapperImpl.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceRepository.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ProxyController.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂Dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$Branch$BranchBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$Branch.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$BranchCityDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$Branch$BranchBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$Branch.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$BranchListDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$DiscountDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$Rate$RateBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto$Rate.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$FxrateDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$Rate$RateBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto$Rate.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto$KrwDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto$RequestDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$Rate$RateBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$Rate.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestListDto$RequestListDtoBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RequestListDto.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂transaction
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataBody$DataBodyBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataHeader$DataHeaderBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataHeader.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestData$RequestDataBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestData.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ResponseData$ResponseDataBuilder.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ResponseData$Transaction.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ResponseData$TransactionDataBody.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ResponseData.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂Service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TransactionService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AlarmService$1.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AlarmService.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMConfig.class
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HackApplication.class
 ┃ ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂hack
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HackApplicationTests.class
 ┃ ┣ 📂generated
 ┃ ┃ ┗ 📂sources
 ┃ ┃ ┃ ┗ 📂annotationProcessor
 ┃ ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┃ ┗ 📂main
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂hack
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryMapperImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂friends
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendMapperImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Location
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationMapperImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginMapperImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂remittance
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceMapperImpl.java
 ┃ ┣ 📂libs
 ┃ ┃ ┣ 📜hack-0.0.1-SNAPSHOT-plain.jar
 ┃ ┃ ┗ 📜hack-0.0.1-SNAPSHOT.jar
 ┃ ┣ 📂reports
 ┃ ┃ ┗ 📂tests
 ┃ ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┃ ┣ 📂classes
 ┃ ┃ ┃ ┃ ┃ ┗ 📜com.shinhan.hack.HackApplicationTests.html
 ┃ ┃ ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┃ ┃ ┣ 📜base-style.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜style.css
 ┃ ┃ ┃ ┃ ┣ 📂js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜report.js
 ┃ ┃ ┃ ┃ ┣ 📂packages
 ┃ ┃ ┃ ┃ ┃ ┗ 📜com.shinhan.hack.html
 ┃ ┃ ┃ ┃ ┗ 📜index.html
 ┃ ┣ 📂resources
 ┃ ┃ ┗ 📂main
 ┃ ┃ ┃ ┣ 📂firebase
 ┃ ┃ ┃ ┃ ┗ 📜tutice-c8751-firebase-adminsdk-19suf-cdca12a799.json
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┃ ┃ ┣ 📜choi.jpg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜kim.jpg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lee.jpg
 ┃ ┃ ┃ ┃ ┃ ┗ 📜yoon.jpg
 ┃ ┃ ┃ ┗ 📜application.properties
 ┃ ┣ 📂test-results
 ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┣ 📂binary
 ┃ ┃ ┃ ┃ ┣ 📜output.bin
 ┃ ┃ ┃ ┃ ┣ 📜output.bin.idx
 ┃ ┃ ┃ ┃ ┗ 📜results.bin
 ┃ ┃ ┃ ┗ 📜TEST-com.shinhan.hack.HackApplicationTests.xml
 ┃ ┣ 📂tmp
 ┃ ┃ ┣ 📂bootJar
 ┃ ┃ ┃ ┗ 📜MANIFEST.MF
 ┃ ┃ ┣ 📂compileJava
 ┃ ┃ ┃ ┣ 📂compileTransaction
 ┃ ┃ ┃ ┃ ┗ 📂stash-dir
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationContoller.class.uniqueId1
 ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationService.class.uniqueId0
 ┃ ┃ ┃ ┗ 📜previous-compilation-data.bin
 ┃ ┃ ┣ 📂compileTestJava
 ┃ ┃ ┃ ┗ 📜previous-compilation-data.bin
 ┃ ┃ ┗ 📂jar
 ┃ ┃ ┃ ┗ 📜MANIFEST.MF
 ┃ ┗ 📜bootJarMainClassName
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┗ 📂hack
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Category.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CategoryMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GlobalExceptionHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂friends
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Friends.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FriendsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂history
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HistoryController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HistoryDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoDocument.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜KakaoLocalResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜History.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HistoryRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HistoryService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂initializer
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TransactionDataInitializer.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Location
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂contoller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationContoller.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LocationService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationApiController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentCategoryDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜StudentDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜StudentLocation.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Student.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LoginService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂remittance
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMNotificationRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPay.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DutchPayDetail.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayDetailRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DutchPayRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemittanceService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ProxyController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂Dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchCityDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BranchListDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DiscountDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FxrateDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KrwDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RequestListDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂transaction
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataBody.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataHeader.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RequestData.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ResponseData.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂Service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TransactionService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AlarmService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FCMConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HackApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂firebase
 ┃ ┃ ┃ ┃ ┗ 📜tutice-c8751-firebase-adminsdk-19suf-cdca12a799.json
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┃ ┃ ┣ 📜choi.jpg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜kim.jpg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lee.jpg
 ┃ ┃ ┃ ┃ ┃ ┗ 📜yoon.jpg
 ┃ ┃ ┃ ┗ 📜application.properties
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂shinhan
 ┃ ┃ ┃ ┃ ┃ ┗ 📂hack
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜HackApplicationTests.java
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜settings.gradle
```

</details>

<details>
<summary>front-end</summary>

```
📦front
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜firebase-messaging-sw.js
 ┃ ┣ 📜index.html
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo512.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜bell.png
 ┃ ┃ ┣ 📜call.png
 ┃ ┃ ┣ 📜card.png
 ┃ ┃ ┣ 📜card2.png
 ┃ ┃ ┣ 📜check.png
 ┃ ┃ ┣ 📜click.png
 ┃ ┃ ┣ 📜dashboard.png
 ┃ ┃ ┣ 📜dollar.png
 ┃ ┃ ┣ 📜friend.png
 ┃ ┃ ┣ 📜gganbu.png
 ┃ ┃ ┣ 📜location.png
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜menu.png
 ┃ ┃ ┣ 📜noncheck.png
 ┃ ┃ ┣ 📜place.png
 ┃ ┃ ┣ 📜qwe.png
 ┃ ┃ ┣ 📜radar.png
 ┃ ┃ ┣ 📜sanghoon.png
 ┃ ┃ ┣ 📜school.png
 ┃ ┃ ┗ 📜wallet.png
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂AlertPage
 ┃ ┃ ┃ ┣ 📜DetailModal.css
 ┃ ┃ ┃ ┣ 📜DetailModal.tsx
 ┃ ┃ ┃ ┣ 📜SquareBox1.css
 ┃ ┃ ┃ ┣ 📜SquareBox1.tsx
 ┃ ┃ ┃ ┣ 📜SquareBox2.css
 ┃ ┃ ┃ ┗ 📜SquareBox2.tsx
 ┃ ┃ ┣ 📂BankLocationPage
 ┃ ┃ ┃ ┗ 📜BankMap.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜formatCurrency.tsx
 ┃ ┃ ┃ ┣ 📜NavBar.css
 ┃ ┃ ┃ ┣ 📜NavBar.tsx
 ┃ ┃ ┃ ┣ 📜SmartId.css
 ┃ ┃ ┃ ┗ 📜SmartId.tsx
 ┃ ┃ ┣ 📂FavoritePlacePage
 ┃ ┃ ┃ ┣ 📜Carousel.tsx
 ┃ ┃ ┃ ┣ 📜FavoriteModal.css
 ┃ ┃ ┃ ┣ 📜FavoritePlace.css
 ┃ ┃ ┃ ┣ 📜FavoritePlace.tsx
 ┃ ┃ ┃ ┗ 📜FavortieModal.tsx
 ┃ ┃ ┣ 📂FxratePage
 ┃ ┃ ┃ ┣ 📜DiscountRate.tsx
 ┃ ┃ ┃ ┣ 📜Fxrate.css
 ┃ ┃ ┃ ┣ 📜Fxrate.tsx
 ┃ ┃ ┃ ┣ 📜Fxratepush.css
 ┃ ┃ ┃ ┣ 📜Fxratepush.tsx
 ┃ ┃ ┃ ┗ 📜KrwAmount.tsx
 ┃ ┃ ┣ 📂FxrequestPage
 ┃ ┃ ┃ ┣ 📜Fxrequest.tsx
 ┃ ┃ ┃ ┣ 📜Fxresult.tsx
 ┃ ┃ ┃ ┣ 📜KrwAmountRequest.tsx
 ┃ ┃ ┃ ┗ 📜kwrate.scss
 ┃ ┃ ┣ 📂MainPage
 ┃ ┃ ┃ ┣ 📜Squarebox.css
 ┃ ┃ ┃ ┗ 📜SquareBox.tsx
 ┃ ┃ ┣ 📂MyCalendar
 ┃ ┃ ┃ ┣ 📜MyCalendar.css
 ┃ ┃ ┃ ┗ 📜MyCalendar.tsx
 ┃ ┃ ┣ 📂RegisterFriendPage
 ┃ ┃ ┃ ┗ 📜MessageBox.tsx
 ┃ ┃ ┗ 📂StudentIdPage
 ┃ ┃ ┃ ┣ 📜BasicBox.tsx
 ┃ ┃ ┃ ┣ 📜Envelop.tsx
 ┃ ┃ ┃ ┣ 📜FriendAdd.tsx
 ┃ ┃ ┃ ┣ 📜FriendId.tsx
 ┃ ┃ ┃ ┣ 📜FriendsList.css
 ┃ ┃ ┃ ┣ 📜FriendsList.tsx
 ┃ ┃ ┃ ┣ 📜RemittanceModal.css
 ┃ ┃ ┃ ┣ 📜RemittanceModal.tsx
 ┃ ┃ ┃ ┣ 📜StudentId.css
 ┃ ┃ ┃ ┗ 📜StudentId.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜push.tsx
 ┃ ┃ ┣ 📜useAlertDutchPay.tsx
 ┃ ┃ ┣ 📜useAllConsumeLogData.tsx
 ┃ ┃ ┣ 📜useCategoryChange.tsx
 ┃ ┃ ┣ 📜useDutchPay.tsx
 ┃ ┃ ┣ 📜useFriendListData.tsx
 ┃ ┃ ┣ 📜useFriendPush.tsx
 ┃ ┃ ┣ 📜useFriendsCategoryList.tsx
 ┃ ┃ ┣ 📜useGetDutchDetail.tsx
 ┃ ┃ ┣ 📜useGetDutchPay.tsx
 ┃ ┃ ┣ 📜useGPSLocation.tsx
 ┃ ┃ ┣ 📜useHavetoDutchPay.tsx
 ┃ ┃ ┣ 📜useLogin.tsx
 ┃ ┃ ┣ 📜useMakeFriend.tsx
 ┃ ┃ ┣ 📜useMakeNewCategory.tsx
 ┃ ┃ ┣ 📜useMyConsumeLogData.tsx
 ┃ ┃ ┣ 📜usePostGPS.tsx
 ┃ ┃ ┣ 📜usePostGPSState.tsx
 ┃ ┃ ┣ 📜useRemittance.tsx
 ┃ ┃ ┣ 📜useSendOneWon.tsx
 ┃ ┃ ┗ 📜useShinhanLocation.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┃ ┣ 📜AlertPage.css
 ┃ ┃ ┃ ┣ 📜BankLocationPage.css
 ┃ ┃ ┃ ┣ 📜ConsumeLogPage.css
 ┃ ┃ ┃ ┣ 📜FavoritePlacePage.css
 ┃ ┃ ┃ ┣ 📜FindMyGganbuPage.css
 ┃ ┃ ┃ ┣ 📜FxratePage.css
 ┃ ┃ ┃ ┣ 📜FxrequestPage.css
 ┃ ┃ ┃ ┣ 📜LoginPage.css
 ┃ ┃ ┃ ┣ 📜LoginPage.scss
 ┃ ┃ ┃ ┗ 📜MainPage.css
 ┃ ┃ ┣ 📜AlertPage.tsx
 ┃ ┃ ┣ 📜BankLocationPage.tsx
 ┃ ┃ ┣ 📜ConsumeLogPage.tsx
 ┃ ┃ ┣ 📜FavoritePlacePage.tsx
 ┃ ┃ ┣ 📜FindMyGganbuPage.tsx
 ┃ ┃ ┣ 📜FxratePage.tsx
 ┃ ┃ ┣ 📜FxrequestPage.tsx
 ┃ ┃ ┣ 📜LoginPage.tsx
 ┃ ┃ ┣ 📜MainPage.tsx
 ┃ ┃ ┣ 📜RegisterFriendPage.tsx
 ┃ ┃ ┗ 📜StudentIdPage.tsx
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜apiService.tsx
 ┃ ┣ 📂stores
 ┃ ┃ ┗ 📜atoms.tsx
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜DataType.tsx
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜api.tsx
 ┃ ┃ ┣ 📜api1.tsx
 ┃ ┃ ┗ 📜fxlist.tsx
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.test.tsx
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜AppRouter.css
 ┃ ┣ 📜AppRouter.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜react-app-env.d.ts
 ┃ ┣ 📜reportWebVitals.ts
 ┃ ┣ 📜service-worker.ts
 ┃ ┣ 📜serviceWorkerRegistration.ts
 ┃ ┣ 📜setupProxy.js
 ┃ ┗ 📜setupTests.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜global.d.ts
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```

</details>

<a id="item-six"></a>

## 서비스 구현 화면

<a id="item-seven"></a>

### 1) Home

<img src="README_assets/33d786e67ae7caf371947785a621fa7eac5facf6.gif" title="" alt="메인화면.gif" width="286">





<a id="item-eight"></a>

### 2) 송금

<img src="README_assets/39e2b26f3798c97f57eeaaf39ca1b2f65bd73092.gif" title="" alt="학생증 송금.gif" width="291">





<a id="item-nine"></a>

### 3) 더치페이

<img src="README_assets/cb27faaa3f4174803cc2bd7ad4155f0a4a3c91ba.gif" title="" alt="더치페이1.gif" width="287">

<img src="README_assets/82487a7bcfe02febbd5197588f19bba9a7045736.gif" title="" alt="더치페이2.gif" width="288">





<a id="item-ten"></a>

### 4) 학생증 저장

<img src="README_assets/801cb9956a8fb12559f6f5d706f7a137ae7162ea.gif" title="" alt="학생증 저장1.gif" width="287">

<img src="README_assets/60a36ce70a90c25360d12ec01c7ab5ce271bddd2.gif" title="" alt="학생증 저장2.gif" width="289">





<a id="item-eleven"></a>

### 5) 환율 및 환전

<img src="README_assets/758421fdc899a9fb44f68fd528b1f4d4781e685e.gif" title="" alt="환율.gif" width="288">

<img src="README_assets/41818b97e2bfe486b606f56508185afea3e48fae.gif" title="" alt="환전신청1.gif" width="288">

<img src="README_assets/dd331660c2d7d52e7e982e43b82aea4faaaa439c.gif" title="" alt="환전신청2.gif" width="285">





<a id="item-twelve"></a>

### 6) 소비로그

<img src="README_assets/266f6afca16c6a2724ab4b65a5df297237334164.gif" title="" alt="소비로그1.gif" width="287">

<img src="README_assets/3d5f1cc025f298cf17d8ed6bc1d14d7a9a00839c.gif" title="" alt="소비로그2.gif" width="291">





<a id="item-thirteen"></a>

### 7) 로그 추천

<img src="README_assets/6e2ac61cccd4a07d45759cde590a60647f9e6177.gif" title="" alt="가게추천1.gif" width="300">

<img title="" src="README_assets/aa8102a8e10ab7eb403c9a58facf054582889713.gif" alt="가게추천2.gif" width="302">





<a id="item-fourteen"></a>

### 8) 영업점 찾기

<img src="README_assets/de6e27f9ff0084c2e7dca50535236f66e827ef31.gif" title="" alt="영업점찾기.gif" width="301">





<a id="item-fifteen"></a>

### 9) 깐부 찾기

<img src="README_assets/beeba3ec65899ddd8d43c53b27460fa02785de14.gif" title="" alt="깐부찾기.gif" width="305">





<a id="item-end"></a>

## 느낀 점
