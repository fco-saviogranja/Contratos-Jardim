import imgContratosjardimGestaoDeContratos from "figma:asset/4c33d75146122aaed2e14a2296216127ffc2e895.png";

function ContratosjardimGestaoDeContratos() {
  return (
    <div className="h-full relative shrink-0 w-[72px]" data-name="CONTRATOSJARDIM - Gestão de Contratos">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[82.5%] left-0 max-w-none top-[8.75%] w-full" src={imgContratosjardimGestaoDeContratos} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[72px]" data-name="Background">
      <ContratosjardimGestaoDeContratos />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[76px] items-start pb-[4px] pt-0 px-0 relative shrink-0 w-[72px]" data-name="Margin">
      <Background />
    </div>
  );
}

function Container() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pl-[3.38px] pr-[3.37px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[30px] justify-center leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-gray-500 w-[305.25px]">
        <p className="mb-0">Gestão de Contratos Internos · Controladoria Geral do</p>
        <p>Municipio de Jardim/CE</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[44.39px]">
        <p className="leading-[normal]">Usuário</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[110.3px]">
        <p className="leading-[normal]">Digite seu usuário</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[10px] py-0 relative w-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Background1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[36.06px]">
        <p className="leading-[normal]">Senha</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[58.5px]">
        <p className="leading-[normal]">••••••••</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[10px] py-0 relative w-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Background2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container6 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#0b6b3a] content-stretch flex h-[32px] items-center justify-center relative rounded-[6px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white w-[37.47px]">
        <p className="leading-[normal]">Entrar</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[198.62px]">
        <p className="leading-[normal]">
          <span>{`Esqueceu a senha? `}</span>
          <span className="font-['Inter:Thin',sans-serif] font-thin not-italic text-[#0b6b3a]">Recuperar acesso</span>
        </p>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="box-border content-stretch flex h-[32px] items-center justify-center p-px relative rounded-[6px] shrink-0 w-full" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] text-center w-[142.95px]">
        <p className="leading-[normal]">Cadastrar novo acesso</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container8 />
      <Border />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[12px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-gray-500 w-[285.73px]">
        <p className="leading-[normal]">Plataforma interna da Controladoria Geral do Município</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-0 relative shrink-0" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[12px] items-center max-w-[1440px] p-[24px] relative rounded-[8px] shrink-0 w-[360px]" data-name="Background">
      <Margin />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] text-center w-[180.61px]">
        <p className="leading-[normal]">CONTRATOSJARDIM</p>
      </div>
      <Container />
      <Margin1 />
      <Margin2 />
      <Margin3 />
    </div>
  );
}

export default function Background5() {
  return (
    <div className="bg-[#f6f8fa] relative size-full" data-name="Background">
      <div className="flex flex-row items-center justify-center min-h-inherit size-full">
        <div className="box-border content-stretch flex items-center justify-center min-h-inherit p-[24px] relative size-full">
          <Background4 />
        </div>
      </div>
    </div>
  );
}