// instascan.d.ts 파일에 다음과 같이 타입 정의를 추가합니다.
declare module "instascan" {
  interface ScannerConfig {
    video: HTMLVideoElement; // 'video' 속성을 HTMLVideoElement 타입으로 지정
  }

  export class Scanner {
    constructor(config: ScannerConfig);
    addListener(event: string, callback: Function): void;
    start(camera: any): void; // 또는 카메라 타입에 맞게 지정
    stop(): void;
    static Camera: any; // 필요한 경우 카메라 타입에 맞게 지정
  }

  // 기타 Instascan에서 사용되는 타입들도 필요한 경우 정의할 수 있습니다.

  const Instascan: {
    Scanner: typeof Scanner;
    Camera: any; // 필요한 경우 카메라 타입에 맞게 지정
    // 다른 Instascan 모듈들도 정의할 수 있습니다.
  };

  export default Instascan;
}
