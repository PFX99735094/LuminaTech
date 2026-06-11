-- Insere os 8 projetos base na tabela public.admin_projects
-- Execute no SQL Editor do Supabase após criar a tabela

insert into public.admin_projects (
  id, title, subtitle, description, difficulty, duration,
  materials, bncc, bncc_code, bncc_competencies, illustration, accent, hidden
)
values
  ('lixeira-inteligente','Lixeira Inteligente','Acionamento automático por proximidade',
   'Os alunos constroem uma lixeira que abre a tampa com sensor ultrassônico, aprendendo sobre distância, sinais digitais e consumo consciente.',
   'Iniciante','2 aulas (90min)',
   '["Arduino Uno","Sensor HC-SR04","Servo 9g","Papelão estrutural"]'::jsonb,
   '["Robótica","Ciências","Matemática"]'::jsonb,
   'EF07ROB02 · EF06MA12',
   '["EF07ROB02","EF08ROB03","EF06CI03","EF06MA12"]'::jsonb,
   'lixeira','amber', false
  ),
  ('carrinho-robo','Carrinho Robô','Controle Bluetooth + desvio de obstáculos',
   'Construção de um veículo autônomo controlado por aplicativo, integrando motor DC, ponte H e conceitos de física do movimento.',
   'Intermediário','4 aulas (90min)',
   '["Chassi MDF","Ponte H L298N","Módulo HC-05","2x Motores DC"]'::jsonb,
   '["Robótica","Física","Matemática"]'::jsonb,
   'EF08ROB03 · EF08MA05',
   '["EF08ROB03","EF09ROB04","EF08CI02","EF08MA05"]'::jsonb,
   'carrinho','lime', false
  ),
  ('braco-hidraulico','Braço Hidráulico','Engenharia sem eletricidade',
   'Um braço mecânico movido a seringas e água que ensina princípios de Pascal, transmissão de força e pensamento de design.',
   'Avançado','3 aulas (90min)',
   '["Seringas 20ml (6x)","Mangueira silicone","Madeira compensada","Pregos"]'::jsonb,
   '["Física","Artes","Tecnologia"]'::jsonb,
   'EF08CI02 · EF69AR13',
   '["EF08CI02","EF69AR13","EF06TE01","EF07TE02"]'::jsonb,
   'braco','cyan', false
  ),
  ('sensor-umidade','Estação Meteorológica','Monitor de umidade do solo e do ar',
   'Sensor DHT22 + display LCD: os alunos aprendem a ler grandezas, exibir dados e discutir mudanças climáticas com a turma.',
   'Iniciante','2 aulas (90min)',
   '["Arduino Nano","DHT22","Display LCD 16x2","Jumpers"]'::jsonb,
   '["Robótica","Ciências","Geografia"]'::jsonb,
   'EF07ROB02 · EF07CI08',
   '["EF07ROB02","EF07CI08","EF07GE05","EF08ROB03"]'::jsonb,
   'sensor','rose', false
  ),
  ('semaforo-inteligente','Semáforo Inteligente','Tempos adaptativos com sensor de presença',
   'LEDs RGB e sensor de movimento simulam um cruzamento real: o sinal abre mais rápido quando detecta carro, perfeito para discutir mobilidade urbana.',
   'Iniciante','2 aulas (90min)',
   '["Arduino Uno","3x LEDs (vermelho, amarelo, verde)","Sensor PIR","Resistores 220Ω"]'::jsonb,
   '["Robótica","Ciências","Matemática","Geografia"]'::jsonb,
   'EF06ROB01 · EF06GE04',
   '["EF06ROB01","EF08ROB03","EF06GE04","EF06MA12"]'::jsonb,
   'semaforo','violet', false
  ),
  ('jardim-automatizado','Jardim Automatizado','Irrigação por bomba submersa e timer',
   'Bomba d''água, sensor de umidade do solo e relé montam um sistema de irrigação automática. Ótimo para discutir consumo de água e segurança alimentar.',
   'Intermediário','3 aulas (90min)',
   '["Arduino Nano","Sensor de umidade do solo","Módulo relé 5V","Bomba submersa 5V"]'::jsonb,
   '["Robótica","Ciências","Geografia"]'::jsonb,
   'EF07ROB02 · EF07CI09',
   '["EF07ROB02","EF08ROB03","EF07CI09","EF07GE05"]'::jsonb,
   'jardim','teal', false
  ),
  ('piano-digital','Piano Digital','Toques capacitivos com buzzer e LEDs',
   'Transformamos clipes de papel em teclas capacitivas: cada toque dispara uma nota no buzzer e acende um LED colorido. Excelente para cruzar música e programação.',
   'Intermediário','2 aulas (90min)',
   '["Arduino Uno","Buzzer piezoelétrico","8x LEDs","Resistores 1MΩ","Clipes metálicos"]'::jsonb,
   '["Robótica","Artes","Matemática"]'::jsonb,
   'EF06ROB01 · EF07MA12',
   '["EF06ROB01","EF08ROB03","EF69AR35","EF07MA12"]'::jsonb,
   'piano','orange', false
  ),
  ('casa-inteligente','Casa Inteligente','LDR, DHT11 e controle de luzes por LDR',
   'Protótipo em maquete acende a luz ao escurecer, mostra temperatura e umidade no display, e aciona um ventilador quando faz calor. Integra vários sensores numa só solução.',
   'Avançado','4 aulas (90min)',
   '["Arduino Mega","Sensor LDR","DHT11","Display LCD","Módulo relé","Ventoinha 5V"]'::jsonb,
   '["Robótica","Tecnologia","Ciências","História"]'::jsonb,
   'EF09ROB04 · EF08HI04',
   '["EF09ROB04","EF07ROB02","EF06TE01","EF08HI04"]'::jsonb,
   'casa','fuchsia', false
  )
on conflict (id) do nothing;
