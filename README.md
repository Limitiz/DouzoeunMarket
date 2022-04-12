# Dou-Zoeun-Market
더존 채용확정형 2기 2팀 리액트로 만드는 중고거래 웹페이지

# 💡 Github-Flow

1. 조직 Repository 생성
  - 각 팀원의 깃허브 계정 이메일로 레파지토리에 초대 
  - 각 팀원들은 레파지토리를 각 개인의 레파지토리에 포크
	- 포크한 레파지토리를 로컬과 연결
	  1. ```java git init```
	  2. ```java git remote add 별칭 원격레포주소```
	  3. 포크해온 레포브랜치명을 master 에서 main 으로 변경
		git branch -m main
		git pull 별칭 main
				보통 별칭을 origin이라고 한다.
	2. 조직 Repository 반영
		각 개인의 깃허브에 반영한 커밋&푸시 사항들을 PullRequest를 통해 조직 레파지토리에 반영
			git add 별칭 브랜치명
			git commit -m "commit message"
			git push 별칭 브랜치명
			pull request
		이후 merge를 통해 조직레포에 합쳐줌
	3. 다른 팀원이 1,2 번을 수행했을 경우를 대비해 항상 변경사항을 로컬에 반영해줘야합니다.
		조직레포를 포크해온 레포에서 fetch upstream을 수행
		이후 pull 을 통해 로컬에 반영



### 💡 :: Commit Type ::

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- refactor : 코드 리팩토링
- test : 테스트 코드, 리팩토링 테스트 코드 추가
- chore : 빌드 수정

---

### 💡 :: Branch명 ::

`Commit Type/이슈명`

ex) feat/Login

### 💡 :: Commit Message ::

`Commit Type/이슈명 : Commit Message`

ex) feat/Login : 로그인 기능 추가
ex) fix/Login : 소셜 연동 실패 원인 제거

---

❗❗**Master 브랜치로 merge하기전에 PR올려서 검토받기**❗❗
