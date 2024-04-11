import { GetStaticPaths, GetStaticProps } from "next";

export default function Customer() {
  return <>qwdqwqd</>;
}
export const getStaticPaths: GetStaticPaths = async (context) => {
  try {
    const wedding = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findAllMoneyToken`)).json();
    const possibleTokenValues: Array<string> = wedding.map((it: any) => {
      return it._id;
    }); // 가능한 토큰 값들로 대체해야 합니다.

    const paths = possibleTokenValues.map((token) => ({
      params: { token },
    }));

    return {
      paths,
      fallback: false, // fallback이 false이면 존재하지 않는 경로로의 접근은 404 페이지를 반환합니다.
    };
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const token = (params?.token as string) || ("" as string);
  try {
    const company: Array<{
      _id: string;
      name: string;
      addr: string;
      phone: string;
      hallList: Array<{
        _id: string;
        name: string;
        floor: number;
        size: string;
      }>;
    }> = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/getAllCompany`)).json();

    return {
      props: {
        company,
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: {
        value: null,
      },
    };
  }
};
