import svgPaths from "./svg-d0bdkp8apz";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[128.66px]">
        <p className="leading-[normal]">ContratosJardim</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#0b6b3a] rounded-[6px] shrink-0 size-[32px]" data-name="Background" />
      <Container1 />
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[17px] pr-0 py-0 relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[16px] w-[310.92px]">
        <p className="leading-[normal]">Sistema de Gestão de Contratos Internos</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <VerticalBorder />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[32.98px]">
        <p className="leading-[normal]">Ajuda</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[13px] w-[68.31px]">
        <p className="leading-[normal]">Maria Silva</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[110.28px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[22.23px]">
        <p className="leading-[normal]">Sair</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Background">
      <div className="bg-[#0b6b3a] rounded-[999px] shrink-0 size-[24px]" data-name="Background" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container4 />
      <Background />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[8px] relative w-full">
          <Container3 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[45.84px]">
        <p className="leading-[normal]">Principal</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[67.8px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[67.8px]">
        <p className="leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.89px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[96.89px]">
        <p className="leading-[normal]">Meus contratos</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100.78px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[100.78px]">
        <p className="leading-[normal]">Todos contratos</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[131.09px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[131.09px]">
        <p className="leading-[normal]">Cadastro de contrato</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[101.11px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[101.11px]">
        <p className="leading-[normal]">Alertas e prazos</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[6.64px]">
        <p className="leading-[normal]">5</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container19 />
      <Background2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
      <Container18 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container10 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[52.42px]">
        <p className="leading-[normal]">Relatórios</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[61.95px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[61.95px]">
        <p className="leading-[normal]">Relatórios</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container23 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[135.95px]">
        <p className="leading-[normal]">Administração do sistema</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[117.53px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[117.53px]">
        <p className="leading-[normal]">Gerenciar usuários</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#0d612f] box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[122px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[122px]">
        <p className="leading-[normal]">Parâmetros e perfis</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[115.52px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[115.52px]">
        <p className="leading-[normal]">Aparência e layout</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[133.47px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[13px] w-[133.47px]">
        <p className="leading-[normal]">Configurações gerais</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="shrink-0 size-[16px]" data-name="Rectangle" />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container31 />
      <Container33 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container28 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0" data-name="Container">
      <Container22 />
      <Container27 />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[54px] items-end justify-between relative shrink-0 w-[1408px]" data-name="Container">
      <Container38 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[8px] pt-0 px-[32px] relative w-full">
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[18px] w-[162.28px]">
        <p className="leading-[normal]">Gerenciar usuários</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[209.16px]">
        <p className="leading-[normal]">Acesso exclusivo: Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex gap-[6px] items-center px-[8px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="bg-[#0b6b3a] rounded-[999px] shrink-0 size-[14px]" data-name="Background" />
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Background5 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container42 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3b397100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" />
          <path d={svgPaths.p7410100} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[82.27px]">
          <p className="leading-[normal]">Novo usuário</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex gap-[6px] items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg />
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <BackgroundBorder />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[13px] w-[146.33px]">
        <p className="leading-[normal]">Administradores (CGM)</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[7.22px]">
        <p className="leading-[normal]">4</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center justify-between px-[10px] py-[6px] relative rounded-[6px] shrink-0 w-[458.67px]" data-name="Background">
      <Container46 />
      <Background6 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[139.67px]">
        <p className="leading-[normal]">Gestores de Contratos</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[11.5px]">
        <p className="leading-[normal]">18</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="box-border content-stretch flex items-center justify-between px-[10px] py-[6px] relative rounded-[6px] shrink-0 w-[458.67px]" data-name="Container">
      <Container47 />
      <Background8 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500 w-[126.97px]">
        <p className="leading-[normal]">Fiscais de Contratos</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex flex-col items-start px-[6px] py-0 relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[13.69px]">
        <p className="leading-[normal]">32</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="box-border content-stretch flex items-center justify-between pl-[10px] pr-[9.99px] py-[6px] relative rounded-[6px] shrink-0 w-[458.67px]" data-name="Container">
      <Container49 />
      <Background9 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center p-[4px] relative w-full">
          <Background7 />
          <Container48 />
          <Container50 />
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[142.02px]">
        <p className="leading-[normal]">Buscar por nome ou e-mail</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[190.06px]">
            <p className="leading-[normal]">Digite parte do nome ou e-mail</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container51 />
      <BackgroundBorder1 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[95.94px]">
        <p className="leading-[normal]">Secretaria / Órgão</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[37.8px]">
            <p className="leading-[normal]">Todos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container53 />
      <BackgroundBorder2 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[45.84px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[37.83px]">
            <p className="leading-[normal]">Ativos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container55 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[27.64px]">
        <p className="leading-[normal]">Perfil</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
          <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[144.56px]">
            <p className="leading-[normal]">Administradores (CGM)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[140px] relative shrink-0" data-name="Container">
      <Container57 />
      <BackgroundBorder4 />
    </div>
  );
}

function Border() {
  return (
    <div className="box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[42.75px]">
        <p className="leading-[normal]">Limpar</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#0b6b3a] box-border content-stretch flex items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[83.08px]">
        <p className="leading-[normal]">Aplicar filtros</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Border />
      <BackgroundBorder5 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-end min-w-[185.83px] pl-[483.547px] pr-0 py-0 relative shrink-0 w-[669.377px]" data-name="Margin">
      <Container59 />
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-end size-full">
        <div className="box-border content-stretch flex gap-[12px] items-end px-[12px] py-[10px] relative w-full">
          <Container52 />
          <Container54 />
          <Container56 />
          <Container58 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[14px] w-[230.84px]">
        <p className="leading-[normal]">Usuários - Administradores (CGM)</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[308.67px]">
        <p className="leading-[normal]">Perfis com poderes de administração geral do sistema</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container62 />
    </div>
  );
}

function Cell() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[246.23px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[34.03px]">
        <p className="leading-[normal]">Nome</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[273.59px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[36.31px]">
        <p className="leading-[normal]">E-mail</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[191.52px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[30.16px]">
        <p className="leading-[normal]">Perfil</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[246.23px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[104.67px]">
        <p className="leading-[normal]">Secretaria / Órgão</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[136.8px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[50px]">
        <p className="leading-[normal]">Situação</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[136.8px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[81.27px]">
        <p className="leading-[normal]">Último acesso</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-[10px] py-[8px] relative shrink-0 w-[136.83px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[36.11px]">
        <p className="leading-[normal]">Ações</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#e9f7ee] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Row />
    </div>
  );
}

function Data() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[10px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[67.42px]">
        <p className="leading-[normal]">Maria Silva</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] pb-[10px] pt-[8px] px-[10px] right-[848.18px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[141.55px]">
        <p className="leading-[normal]">maria.silva@gmail.com</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[111.64px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[519.83px] px-[10px] py-[8px] right-[656.65px] top-0" data-name="Data">
      <Background12 />
    </div>
  );
}

function Data3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[711.34px] pb-[10px] pt-[8px] px-[10px] right-[410.43px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[202.45px]">
        <p className="leading-[normal]">Controladoria Geral do Município</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[26.83px]">
        <p className="leading-[normal]">Ativo</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] px-[10px] py-[8px] right-[273.62px] top-0" data-name="Data">
      <Background13 />
    </div>
  );
}

function Data5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1094.38px] pb-[10px] pt-[8px] px-[10px] right-[136.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[76.05px]">
        <p className="leading-[normal]">Hoje • 09:12</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[54.38px]">
        <p className="leading-[normal]">Desativar</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1241.17px] right-[10px] top-[8px]" data-name="Data">
      <Container63 />
      <Container64 />
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-white h-[34px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
      <Data6 />
    </div>
  );
}

function Data7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[10px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[81.66px]">
        <p className="leading-[normal]">Carlos Souza</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] pb-[10px] pt-[8px] px-[10px] right-[848.18px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[165.95px]">
        <p className="leading-[normal]">carlos.souza@hotmail.com</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[111.64px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[519.83px] px-[10px] py-[8px] right-[656.65px] top-0" data-name="Data">
      <Background14 />
    </div>
  );
}

function Data10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[711.34px] pb-[10px] pt-[8px] px-[10px] right-[410.43px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[202.45px]">
        <p className="leading-[normal]">Controladoria Geral do Município</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[26.83px]">
        <p className="leading-[normal]">Ativo</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] px-[10px] py-[8px] right-[273.62px] top-0" data-name="Data">
      <Background15 />
    </div>
  );
}

function Data12() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1094.38px] pb-[10px] pt-[8px] px-[10px] right-[136.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[87.89px]">
        <p className="leading-[normal]">Ontem • 17:40</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[54.38px]">
        <p className="leading-[normal]">Desativar</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1241.17px] right-[10px] top-[8px]" data-name="Data">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[#f0f4f8] h-[34px] relative shrink-0 w-full" data-name="Row">
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
    </div>
  );
}

function Data14() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[10px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[71.03px]">
        <p className="leading-[normal]">Ana Pereira</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] pb-[10px] pt-[8px] px-[10px] right-[848.18px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[149.91px]">
        <p className="leading-[normal]">ana.pereira@yahoo.com</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[111.64px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[519.83px] px-[10px] py-[8px] right-[656.65px] top-0" data-name="Data">
      <Background16 />
    </div>
  );
}

function Data17() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[711.34px] pb-[10px] pt-[8px] px-[10px] right-[410.43px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[202.45px]">
        <p className="leading-[normal]">Controladoria Geral do Município</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[26.83px]">
        <p className="leading-[normal]">Ativo</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] px-[10px] py-[8px] right-[273.62px] top-0" data-name="Data">
      <Background17 />
    </div>
  );
}

function Data19() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1094.38px] pb-[10px] pt-[8px] px-[10px] right-[136.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[115.73px]">
        <p className="leading-[normal]">10/11/2025 • 08:05</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[54.38px]">
        <p className="leading-[normal]">Desativar</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1241.17px] right-[10px] top-[8px]" data-name="Data">
      <Container67 />
      <Container68 />
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-white h-[34px] relative shrink-0 w-full" data-name="Row">
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
    </div>
  );
}

function Data21() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-[24px] pt-[8px] px-[10px] right-[1121.77px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[63.28px]">
        <p className="leading-[normal]">João Lima</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[246.23px] pb-[24px] pt-[8px] px-[10px] right-[848.18px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[143.42px]">
        <p className="leading-[normal]">joao.lima@outlook.com</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="bg-[#e9f7ee] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[11px] w-[111.64px]">
        <p className="leading-[normal]">Administrador (CGM)</p>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[519.83px] pb-[22px] pt-[8px] px-[10px] right-[656.65px] top-0" data-name="Data">
      <Background18 />
    </div>
  );
}

function Data24() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[711.34px] pb-[24px] pt-[8px] px-[10px] right-[410.43px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[202.45px]">
        <p className="leading-[normal]">Controladoria Geral do Município</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="bg-[#f0f4f8] box-border content-stretch flex items-center px-[6px] py-[2px] relative rounded-[999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[35.14px]">
        <p className="leading-[normal]">Inativo</p>
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[957.58px] pb-[22px] pt-[8px] px-[10px] right-[273.62px] top-0" data-name="Data">
      <Background19 />
    </div>
  );
}

function Data26() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[1094.38px] px-[10px] py-[8px] right-[136.82px] top-0" data-name="Data">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[32px] justify-center leading-[normal] not-italic relative shrink-0 text-[#102a43] text-[13px] w-[84.29px]">
        <p className="mb-0">05/09/2025 •</p>
        <p>14:22</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[33.28px]">
        <p className="leading-[normal]">Editar</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b6b3a] text-[12px] w-[46.98px]">
        <p className="leading-[normal]">Reativar</p>
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[1241.17px] right-[10px] top-[8px]" data-name="Data">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[#f0f4f8] h-[48px] relative shrink-0 w-full" data-name="Row">
      <Data21 />
      <Data22 />
      <Data23 />
      <Data24 />
      <Data25 />
      <Data26 />
      <Data27 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header />
      <Body />
    </div>
  );
}

function Background20() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <Table />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[189.41px]">
        <p className="leading-[normal]">Mostrando 1–4 de 4 administradores</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500 w-[402.52px]">
        <p className="leading-[normal]">Para alterar o perfil de um usuário, edite o cadastro e ajuste o tipo de acesso.</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Container72 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container73 />
    </div>
  );
}

function Background21() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Margin1 />
          <Background20 />
          <Margin2 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-[#f6f8fa] h-[600px] relative shrink-0 w-full" data-name="Main">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[600px] items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
          <Container45 />
          <Background10 />
          <Background11 />
          <Background21 />
        </div>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[474.2px]">
        <p className="leading-[normal]">© Controladoria Geral do Municipio de Jardim - CE • Portal Interno de Gestão de Contratos</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[63.83px]">
        <p className="leading-[normal]">Institucional</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[75.2px]">
        <p className="leading-[normal]">Transparência</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[119.36px]">
        <p className="leading-[normal]">Política de privacidade</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Thin',sans-serif] font-thin h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6f7ee] text-[11px] w-[76.58px]">
        <p className="leading-[normal]">Acessibilidade</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#0a4e33] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[32px] py-[10px] relative w-full">
          <Container74 />
          <Container75 />
        </div>
      </div>
    </div>
  );
}

export default function Background23() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex flex-col items-start justify-between relative size-full" data-name="Background">
      <Background1 />
      <Background4 />
      <Main />
      <Background22 />
    </div>
  );
}