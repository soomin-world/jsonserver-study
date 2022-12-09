## JSON

- 브라우저 주소에 url을 입력하는것은 get요청을 하는것.
-

## AXIOS 메소드

- GET : create -> 파라미터로 url은 필수 config는 옵션
  path variable = 특정 id값이 정해져있을때
  query = 검색기능, 혹은 특정한 값을 받아와야할때 사용

- POST : read
- PATCH :update
- DELETE : delete

## thunk

- reducer가 아니라 외부에서 작성되었기 떄문에
  extra reducer라는 메서드를 사용해야한다.
- thunk함수를 통해서 promise를 다룰 수 있다.
- 서버에서 가져오는 상태 -> pending -> fullfilled -> rejected가 있다.
