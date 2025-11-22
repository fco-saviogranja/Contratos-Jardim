import { useState, useEffect } from 'react';
import { Palette, Bell, FileText, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { localStore } from '../utils/localStore';

interface SystemSettingsProps {
  accessToken: string;
}

interface Settings {
  // Aparência
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  systemName: string;
  
  // Notificações
  enableEmailNotifications: boolean;
  daysBeforeExpiry: number;
  
  // Contratos
  defaultContractDuration: number;
  requireApproval: boolean;
}

export function SystemSettings({ accessToken }: SystemSettingsProps) {
  const [settings, setSettings] = useState<Settings>({
    primaryColor: '#16a34a', // green-600
    secondaryColor: '#eab308', // yellow-500
    logoUrl: '',
    systemName: 'ContratosJardim',
    enableEmailNotifications: false,
    daysBeforeExpiry: 30,
    defaultContractDuration: 12,
    requireApproval: false,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load settings from localStorage
      const savedSettings = localStore.getSettings();
      
      // Merge with defaults to ensure all fields exist
      const mergedSettings = {
        ...settings,
        ...savedSettings,
      };
      
      setSettings(mergedSettings);
      // Apply colors immediately
      applyColors(mergedSettings.primaryColor, mergedSettings.secondaryColor);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Erro ao carregar configurações');
    }
  };

  const applyColors = (primaryColor: string, secondaryColor: string) => {
    // Apply colors via CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save settings to localStorage
      localStore.setSettings({
        primaryColor: settings.primaryColor,
        secondaryColor: settings.secondaryColor,
        logoUrl: settings.logoUrl,
        systemName: settings.systemName,
      });

      // Apply colors immediately after saving
      applyColors(settings.primaryColor, settings.secondaryColor);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Aparência */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-green-600" />
          <h3 className="text-green-800">Aparência do Sistema</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">Nome do Sistema</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                placeholder="ContratosJardim"
              />
              <p className="text-xs text-gray-500">Exibido no cabeçalho e rodapé</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">URL da Logo (opcional)</Label>
              <Input
                id="logoUrl"
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                placeholder="https://exemplo.com/logo.png"
              />
              <p className="text-xs text-gray-500">Logo personalizada do sistema</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  placeholder="#16a34a"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Cor verde institucional</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  placeholder="#eab308"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Cor amarela institucional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-600" />
          <h3 className="text-green-800">Notificações e Alertas</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="emailNotifications">Notificações por E-mail</Label>
              <p className="text-sm text-gray-600">
                Enviar alertas de vencimento para gestores
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.enableEmailNotifications}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, enableEmailNotifications: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daysBeforeExpiry">Dias de Antecedência para Alertas</Label>
            <Select
              value={settings.daysBeforeExpiry.toString()}
              onValueChange={(value) => 
                setSettings({ ...settings, daysBeforeExpiry: parseInt(value) })
              }
            >
              <SelectTrigger id="daysBeforeExpiry">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="45">45 dias</SelectItem>
                <SelectItem value="60">60 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Contratos próximos do vencimento serão destacados com {settings.daysBeforeExpiry} dias de antecedência
            </p>
          </div>
        </div>
      </div>

      {/* Contratos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-600" />
          <h3 className="text-green-800">Gerenciamento de Contratos</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultDuration">Duração Padrão de Contratos (meses)</Label>
            <Select
              value={settings.defaultContractDuration.toString()}
              onValueChange={(value) => 
                setSettings({ ...settings, defaultContractDuration: parseInt(value) })
              }
            >
              <SelectTrigger id="defaultDuration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 meses</SelectItem>
                <SelectItem value="12">12 meses</SelectItem>
                <SelectItem value="24">24 meses</SelectItem>
                <SelectItem value="36">36 meses</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Valor sugerido ao criar novos contratos
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="requireApproval">Exigir Aprovação de Contratos</Label>
              <p className="text-sm text-gray-600">
                Administradores devem aprovar novos contratos
              </p>
            </div>
            <Switch
              id="requireApproval"
              checked={settings.requireApproval}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, requireApproval: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </div>
    </div>
  );
}