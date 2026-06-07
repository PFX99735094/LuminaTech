import type { ProjectDetails } from '../types';

const lixeira: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'lixeira_inteligente.ino',
  wiringImage: '/wiring/lixeira-inteligente.png',
  wiringImageAlt: 'Foto real da montagem: Arduino Uno com sensor HC-SR04 e servo SG90 ligados por jumpers coloridos.',
  wiringCaption: 'Arduino Uno + HC-SR04 + Servo SG90 — protoboard e jumpers reais.',
  summary:
    'Lixeira que abre a tampa automaticamente ao detectar mão ou objeto a menos de 20 cm, usando sensor ultrassônico HC-SR04 e um servo SG90.',
  warnings: [
    'Use o servo alimentado pelos 5V do Arduino apenas durante testes. Em sala, prefira uma fonte externa de 5V/2A para evitar reset.',
    'Capriche na fixação do sensor na tampa para evitar leituras em ângulo que distorcem a distância.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Uno' },
    { id: 'hc-sr04', name: 'Sensor HC-SR04' },
    { id: 'servo', name: 'Servo SG90' },
    { id: 'jumpers', name: 'Jumpers e protoboard' },
  ],
  connections: [
    { from: 'HC-SR04 · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'HC-SR04 · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'HC-SR04 · TRIG', to: 'Arduino · D9', label: 'Amarelo' },
    { from: 'HC-SR04 · ECHO', to: 'Arduino · D10', label: 'Branco' },
    { from: 'Servo · Vermelho', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'Servo · Marrom', to: 'Arduino · GND', label: 'Preto' },
    { from: 'Servo · Laranja', to: 'Arduino · D6', label: 'Sinal' },
  ],
  setupSteps: [
    'Fixe o HC-SR04 na borda da tampa com cola quente, olhando para baixo.',
    'Prenda o servo na parte interna da lixeira de forma que o eixo empurre a tampa entre 0° (fechada) e 90° (aberta).',
    'Conecte os fios seguindo a tabela de conexões.',
    'Carregue o código no Arduino e abra o Monitor Serial em 9600 baud para conferir as leituras.',
  ],
  code: `// Lixeira Inteligente — Lúmina Tech
// Aciona servo ao detectar objeto a menos de 20 cm com HC-SR04

#include <Servo.h>

const int trigPin = 9;
const int echoPin = 10;
const int servoPin = 6;
const int distanciaGatilho = 20; // cm

Servo tampa;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  tampa.attach(servoPin);
  tampa.write(0); // começa fechada
  Serial.begin(9600);
  Serial.println("Lixeira inteligente pronta.");
}

void loop() {
  long duracao = medirDistancia();
  int distanciaCm = duracao * 0.034 / 2;

  Serial.print("Distancia: ");
  Serial.print(distanciaCm);
  Serial.println(" cm");

  if (distanciaCm > 0 && distanciaCm < distanciaGatilho) {
    tampa.write(90); // abre
  } else {
    tampa.write(0);  // fecha
  }

  delay(150);
}

long medirDistancia() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH, 25000);
}
`,
};

const carrinho: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'carrinho_bluetooth.ino',
  wiringImage: '/wiring/carrinho-robo.jpg',
  wiringImageAlt: 'Foto real do carrinho: Arduino Uno, ponte H L298N, módulo HC-05 e motores DC montados no chassi.',
  wiringCaption: 'Chassi MDF com Arduino, L298N, HC-05 e 2 motores DC.',
  summary:
    'Carrinho controlado por aplicativo via Bluetooth HC-05. Recebe comandos F/B/L/R/S e aciona os motores DC pela ponte H L298N.',
  warnings: [
    'Use pilhas ou bateria LiPo 7,4V para alimentar o L298N. Não alimente os motores pelo 5V do Arduino.',
    'Mantenha o jumper GND da bateria conectado ao GND do Arduino para referência única de terra.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Uno' },
    { id: 'ponte-h', name: 'Ponte H L298N' },
    { id: 'hc-05', name: 'Módulo Bluetooth HC-05' },
    { id: 'motores', name: '2x Motores DC 3–6V' },
    { id: 'bateria', name: 'Bateria 7,4V' },
  ],
  connections: [
    { from: 'L298N · +12V', to: 'Bateria · V+', label: 'Vermelho' },
    { from: 'L298N · GND', to: 'Arduino · GND + Bateria · V-', label: 'Preto' },
    { from: 'L298N · 5V', to: 'Arduino · 5V', label: 'Lógica' },
    { from: 'L298N · ENA', to: 'Arduino · D9', label: 'PWM Motor A' },
    { from: 'L298N · IN1', to: 'Arduino · D8', label: 'Direção A' },
    { from: 'L298N · IN2', to: 'Arduino · D7', label: 'Direção A' },
    { from: 'L298N · IN3', to: 'Arduino · D6', label: 'Direção B' },
    { from: 'L298N · IN4', to: 'Arduino · D5', label: 'Direção B' },
    { from: 'L298N · ENB', to: 'Arduino · D3', label: 'PWM Motor B' },
    { from: 'HC-05 · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'HC-05 · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'HC-05 · TX', to: 'Arduino · D0 (RX)', label: 'Dados' },
    { from: 'HC-05 · RX', to: 'Arduino · D1 (TX)', label: 'Dados' },
  ],
  setupSteps: [
    'Pareie o HC-05 com o celular usando o app "Arduino Bluetooth Controller" ou similar.',
    'Defina a velocidade dos motores ajustando o valor enviado ao analogWrite (0–255).',
    'Para testes sem bateria, mantenha o L298N desconectado da bateria e use apenas a USB.',
  ],
  code: `// Carrinho Robô Bluetooth — Lúmina Tech
// Comandos: F (frente) · B (trás) · L (esquerda) · R (direita) · S (parar)

const int enA = 9;
const int in1 = 8;
const int in2 = 7;
const int in3 = 6;
const int in4 = 5;
const int enB = 3;
const int velocidade = 180;

void setup() {
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  analogWrite(enA, velocidade);
  analogWrite(enB, velocidade);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    switch (cmd) {
      case 'F': frente();  break;
      case 'B': tras();    break;
      case 'L': esquerda();break;
      case 'R': direita(); break;
      case 'S': parar();   break;
    }
  }
}

void frente() {
  digitalWrite(in1, HIGH); digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH); digitalWrite(in4, LOW);
}

void tras() {
  digitalWrite(in1, LOW);  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);  digitalWrite(in4, HIGH);
}

void esquerda() {
  digitalWrite(in1, LOW);  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH); digitalWrite(in4, LOW);
}

void direita() {
  digitalWrite(in1, HIGH); digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);  digitalWrite(in4, HIGH);
}

void parar() {
  digitalWrite(in1, LOW);  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);  digitalWrite(in4, LOW);
}
`,
};

const braco: ProjectDetails = {
  kind: 'mecanica',
  inoFilename: 'braco_hidraulico_montagem.ino',
  wiringImage: '/wiring/braco-hidraulico.jpg',
  wiringImageAlt: 'Foto real do braço hidráulico montado: seringas mestres e escravas conectadas por mangueiras coloridas em uma base de madeira.',
  wiringCaption: 'Braço hidráulico com 6 seringas e mangueiras coloridas.',
  summary:
    'Braço hidráulico feito com 6 seringas e água — sem eletricidade. As seringas P1/P2/P3 controlam as três articulações, transmitindo força pelo Princípio de Pascal.',
  warnings: [
    'Este projeto é 100% mecânico — não usa Arduino. A página traz o esquema de montagem em vez de código.',
    'Pintar a estrutura com tinta acrílica depois de montada aumenta muito a durabilidade.',
  ],
  components: [
    { id: 'seringas', name: '6x Seringas 20ml' },
    { id: 'mangueira', name: 'Mangueira de silicone 1m' },
    { id: 'madeira', name: 'Madeira compensada 6mm' },
    { id: 'pregos', name: 'Pregos e parafusos pequenos' },
    { id: 'agua', name: 'Água com corante' },
  ],
  connections: [
    { from: 'Seringa mestre (P₁)', to: 'Seringa escrava · Base', label: 'Mangueira vermelha' },
    { from: 'Seringa mestre (P₂)', to: 'Seringa escrava · Cotovelo', label: 'Mangueira azul' },
    { from: 'Seringa mestre (P₃)', to: 'Seringa escrava · Garra', label: 'Mangueira amarela' },
    { from: 'Ponto de pivot', to: 'Base de madeira', label: 'Parafuso M3' },
    { from: 'Reservatório', to: 'Linha d\'água', label: 'Purgar bolhas' },
  ],
  setupSteps: [
    'Recorte as peças da base e das articulações em MDF ou compensado conforme o gabarito incluso no plano de aula.',
    'Fure as seringas e encaixe as mangueiras com cola quente para vedar.',
    'Pinte 3 seringas como "mestres" (com êmbolo) e 3 como "escravas" (sem êmbolo, fixas no braço).',
    'Preencha todo o sistema com água corada e purgue bolhas de ar empurrando os êmbolos lentamente.',
    'Teste empurrando a seringa mestre e observe o movimento sincronizado da escrava correspondente.',
  ],
  code: `// Braço Hidráulico — Lúmina Tech
// Este projeto é puramente mecânico. O arquivo .ino é um guia de aula
// com a lista de checagem para você imprimir e levar para a sala.

const char planoDeAula[] PROGMEM = R"PLANO(
  CHECKLIST DE MONTAGEM — BRAÇO HIDRÁULICO
  =========================================
  [ ] Base cortada em compensado 6mm
  [ ] 3 seringas mestres com êmbolo
  [ ] 3 seringas escravas sem êmbolo
  [ ] 3 metros de mangueira silicone
  [ ] 1L de água com corante
  [ ] Cola quente + fita veda-rosca
  [ ] Pregos 12mm e parafusos M3

  ETAPA 1 — FIXAÇÃO
    Marque os pontos de pivot conforme o gabarito.
    Prenda a base e o cotovelo com parafusos M3.

  ETAPA 2 — CIRCUITO HIDRÁULICO
    Conecte P1 → Base, P2 → Cotovelo, P3 → Garra.

  ETAPA 3 — PURGA
    Empurre cada êmbolo até sair água sem bolhas.

  ETAPA 4 — TESTE
    Mova a seringa mestre 1cm e meça o deslocamento
    da escrava. Razão esperada ≈ 1:1 (mesma seringa).
)PLANO";

void setup() {
  Serial.begin(9600);
  Serial.println("Braço Hidraulico — roteiro carregado.");
  Serial.println(planoDeAula);
}

void loop() {
  // nada — roteiro fica disponível no Monitor Serial
}
`,
};

const estacao: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'estacao_meteorologica.ino',
  wiringImage: '/wiring/sensor-umidade.jpg',
  wiringImageAlt: 'Foto real da estação: Arduino Nano com sensor DHT22 e display LCD 16x2 I2C ligados por jumpers.',
  wiringCaption: 'Arduino Nano + DHT22 + LCD 16x2 I2C em protoboard.',
  summary:
    'Estação que mostra temperatura e umidade do ar no display LCD 16x2 (versão I2C), usando o sensor DHT22.',
  warnings: [
    'Use o sensor DHT22 com resistor pull-up de 10kΩ entre DATA e VCC, mesmo que a maioria dos módulos já traga o resistor soldado.',
    'O endereço I2C mais comum do LCD é 0x27. Se nada aparecer, rode um scanner I2C e troque no código.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Nano' },
    { id: 'dht22', name: 'Sensor DHT22' },
    { id: 'lcd', name: 'Display LCD 16x2 I2C' },
    { id: 'jumpers', name: 'Jumpers e protoboard' },
  ],
  connections: [
    { from: 'DHT22 · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'DHT22 · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'DHT22 · DATA', to: 'Arduino · D2', label: 'Amarelo + pull-up 10kΩ' },
    { from: 'LCD · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'LCD · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'LCD · SDA', to: 'Arduino · A4', label: 'Dados I2C' },
    { from: 'LCD · SCL', to: 'Arduino · A5', label: 'Clock I2C' },
  ],
  setupSteps: [
    'Instale as bibliotecas "DHT sensor library" e "LiquidCrystal_I2C" pela IDE do Arduino.',
    'Conecte o display e rode o exemplo I2CScanner para confirmar o endereço (0x27 ou 0x3F).',
    'Monte o sensor DHT22 com o resistor de pull-up.',
    'Abra o Monitor Serial em 9600 para ver as leituras cruas e o LCD para a versão visual.',
  ],
  extensions: [
    'Adicione um sensor de pressão BMP280 para mostrar também a pressão atmosférica.',
    'Grave os dados em um cartão SD com módulo SPI para análises ao longo da semana.',
  ],
  code: `// Estação Meteorológica — Lúmina Tech
// Temperatura e umidade no LCD 16x2 com DHT22

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  dht.begin();
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Estacao  Meteo");
  delay(2000);
}

void loop() {
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Falha ao ler o DHT22!");
    return;
  }

  Serial.print("Temp: ");
  Serial.print(temperatura);
  Serial.print(" C | Umid: ");
  Serial.print(umidade);
  Serial.println(" %");

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperatura, 1);
  lcd.print(" C");

  lcd.setCursor(0, 1);
  lcd.print("Umid: ");
  lcd.print(umidade, 0);
  lcd.print(" %   ");

  delay(2000);
}
`,
};

export const projectDetails: Record<string, ProjectDetails> = {
  'lixeira-inteligente': lixeira,
  'carrinho-robo': carrinho,
  'braco-hidraulico': braco,
  'sensor-umidade': estacao,
};

export function hasProjectDetails(projectId: string): boolean {
  return Object.prototype.hasOwnProperty.call(projectDetails, projectId);
}
