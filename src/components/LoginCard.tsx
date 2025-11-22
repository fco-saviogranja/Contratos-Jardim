import { useState } from 'react';
import imgLogo from "figma:asset/f6a9869d371560fae8a34486a3ae60bdf404d376.png";

interface LoginCardProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
  isLoading: boolean;
  error: string | null;
}

export function LoginCard({ onLogin, onSignup, isLoading, error }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="bg-white h-[566.188px] relative rounded-[12px] shrink-0 w-[448px]">
      <div aria-hidden="true" className="absolute border border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] h-[566.188px] items-start p-px relative w-[448px]">
        
        {/* Header com Logo */}
        <div className="h-[220.188px] relative shrink-0 w-[446px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[220.188px] relative w-[446px]">
            {/* Logo */}
            <div className="absolute bg-[rgba(255,255,255,0.1)] box-border content-stretch flex flex-col items-start left-[178px] pb-px pt-[13px] px-[13px] rounded-[12px] size-[90px] top-[24px]">
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="h-[64px] relative rounded-[12px] shadow-[0px_2px_8px_0px_rgba(74,124,89,0.1)] shrink-0 w-full">
                <img alt="Logo Jardim" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none rounded-[12px] size-full" src={imgLogo} />
              </div>
            </div>
            
            {/* Título */}
            <div className="absolute h-[46.188px] left-[24px] top-[136px] w-[398px]">
              <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[46.2px] left-[199.88px] text-[#4a7c59] text-[42px] text-center text-nowrap top-[-4px] tracking-[-0.84px] translate-x-[-50%] whitespace-pre">ContratosJardim</p>
            </div>
            
            {/* Descrição */}
            <div className="absolute h-[24px] left-[24px] top-[196.19px] w-[398px]">
              <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[199.39px] text-[#6c757d] text-[16px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Sistema de Gestão de Contratos - Prefeitura de Jardim/CE</p>
            </div>
          </div>
        </div>

        {/* Content - Formulário */}
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[446px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] h-full items-start px-[24px] py-0 relative w-[446px]">
            <div className="h-0 shrink-0 w-full" />
            
            <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              {/* Campo Email/Usuário */}
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full">
                  <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[#2d2d2d] text-[14px] text-nowrap whitespace-pre">Email</p>
                </div>
                <div className="bg-[#f8f9fa] h-[36px] relative rounded-[6px] shrink-0 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    disabled={isLoading}
                    className="w-full h-full bg-transparent px-[12px] py-[4px] font-['Arimo:Regular',sans-serif] font-normal text-[14px] text-[#2d2d2d] placeholder:text-[#6c757d] outline-none rounded-[6px]"
                  />
                  <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full">
                  <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[#2d2d2d] text-[14px] text-nowrap whitespace-pre">Senha</p>
                </div>
                <div className="bg-[#f8f9fa] h-[36px] relative rounded-[6px] shrink-0 w-full">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    disabled={isLoading}
                    className="w-full h-full bg-transparent px-[12px] py-[4px] font-['Arimo:Regular',sans-serif] font-normal text-[14px] text-[#2d2d2d] placeholder:text-[#6c757d] outline-none rounded-[6px]"
                  />
                  <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
                </div>
              </div>

              {/* Erro */}
              {error && (
                <div className="w-full">
                  <p className="font-['Arimo:Regular',sans-serif] text-[12px] text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* Botão Entrar */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#4a7c59] h-[36px] relative rounded-[6px] shrink-0 w-full hover:bg-[#3d6749] transition-colors disabled:opacity-50"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-full">
                    <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-center text-white">
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </p>
                  </div>
                </div>
              </button>
            </form>

            {/* Cadastrar */}
            <div className="content-stretch flex flex-col gap-[12px] h-[64px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full">
                <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#6c757d] text-[12px] text-center">
                  Ainda não tem acesso ao sistema?
                </p>
              </div>
              <button
                type="button"
                onClick={onSignup}
                disabled={isLoading}
                className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full hover:bg-[#f8f9fa] transition-colors disabled:opacity-50"
              >
                <div aria-hidden="true" className="absolute border border-[#4a7c59] border-solid inset-0 pointer-events-none rounded-[6px]" />
                <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[198.73px] text-[#4a7c59] text-[14px] text-center text-nowrap top-[6px] translate-x-[-50%] whitespace-pre">
                  Cadastrar
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
