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
  wiringImage: '/wiring/carrinho-robo.png',
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

const estacao: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'estacao_meteorologica.ino',
  wiringImage: '/wiring/sensor-umidade.png',
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

const semaforo: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'semaforo_inteligente.ino',
  wiringImage: '/wiring/semaforo-inteligente.png',
  wiringImageAlt: 'Arduino Uno com LEDs vermelho, amarelo e verde em protoboard e sensor PIR de presença.',
  wiringCaption: 'Arduino Uno + 3 LEDs (R/Y/G) + Sensor PIR — semáforo com detecção de pedestres.',
  summary:
    'Semáforo que alterna LEDs vermelho, amarelo e verde em ciclo contínuo e encurta o tempo do verde quando o sensor PIR detecta um pedestre esperando.',
  warnings: [
    'Sempre use resistores de 220Ω em série com os LEDs para não queimá-los nem danificar as portas do Arduino.',
    'O sensor PIR leva cerca de 30 segundos para se estabilizar após ligar. Durante esse período, pode disparar falsos positivos.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Uno' },
    { id: 'led-vermelho', name: 'LED Vermelho 5mm' },
    { id: 'led-amarelo', name: 'LED Amarelo 5mm' },
    { id: 'led-verde', name: 'LED Verde 5mm' },
    { id: 'resistores', name: '3x Resistores 220Ω' },
    { id: 'pir', name: 'Sensor PIR HC-SR501' },
    { id: 'jumpers', name: 'Jumpers e protoboard' },
  ],
  connections: [
    { from: 'LED Vermelho · Anodo', to: 'Arduino · D13 (→ 220Ω)', label: 'Vermelho' },
    { from: 'LED Vermelho · Catodo', to: 'Arduino · GND', label: 'Preto' },
    { from: 'LED Amarelo · Anodo', to: 'Arduino · D12 (→ 220Ω)', label: 'Amarelo' },
    { from: 'LED Amarelo · Catodo', to: 'Arduino · GND', label: 'Preto' },
    { from: 'LED Verde · Anodo', to: 'Arduino · D11 (→ 220Ω)', label: 'Verde' },
    { from: 'LED Verde · Catodo', to: 'Arduino · GND', label: 'Preto' },
    { from: 'PIR · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'PIR · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'PIR · OUT', to: 'Arduino · D10', label: 'Sinal' },
  ],
  setupSteps: [
    'Conecte os 3 LEDs no protoboard: o anodo (perna longa) de cada LED vai aos pinos D13, D12 e D11 com resistores de 220Ω em série; o catodo (perna curta) vai ao GND.',
    'Conecte o sensor PIR: VCC ao 5V, GND ao GND, OUT ao pino digital D10.',
    'Carregue o código no Arduino e aguarde 30 segundos para o PIR estabilizar.',
    'Abra o Monitor Serial em 9600 baud para ver o estado do semáforo e as detecções do PIR.',
    'Aproxime a mão do PIR enquanto o LED verde estiver aceso e observe o ciclo encurtar.',
  ],
  extensions: [
    'Adicione um buzzer no D8 para emitir um som intermitente quando o semáforo estiver vermelho — acessibilidade para deficientes visuais.',
    'Substitua os LEDs por um módulo de semáforo com display de 7 segmentos para mostrar o tempo restante.',
    'Use dois conjuntos de LEDs (R/Y/G) para simular um cruzamento completo com dois semáforos sincronizados.',
  ],
  code: `// Semáforo Inteligente — Lúmina Tech
// Ciclo R-Y-G com detecção de pedestre via PIR

const int ledRed = 13;
const int ledYellow = 12;
const int ledGreen = 11;
const int pirPin = 10;

const unsigned long greenNormal = 5000;
const unsigned long greenCurto = 2000;
const unsigned long yellowTime = 2000;
const unsigned long redTime = 5000;

void setup() {
  pinMode(ledRed, OUTPUT);
  pinMode(ledYellow, OUTPUT);
  pinMode(ledGreen, OUTPUT);
  pinMode(pirPin, INPUT);
  Serial.begin(9600);
  Serial.println("Semáforo inteligente pronto.");
}

void loop() {
  unsigned long tempoVerde = greenNormal;

  // Fase Verde — verifica se pedestre apareceu
  digitalWrite(ledGreen, HIGH);
  unsigned long inicio = millis();
  while (millis() - inicio < tempoVerde) {
    if (digitalRead(pirPin) == HIGH) {
      tempoVerde = greenCurto;
      Serial.println("Pedestre detectado! Encurtando verde.");
    }
  }
  digitalWrite(ledGreen, LOW);

  // Fase Amarela
  digitalWrite(ledYellow, HIGH);
  delay(yellowTime);
  digitalWrite(ledYellow, LOW);

  // Fase Vermelha
  digitalWrite(ledRed, HIGH);
  delay(redTime);
  digitalWrite(ledRed, LOW);
}
`,
};

const controleGestos: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'controle_gestos.ino',
  wiringImage: '/wiring/controle-gestos-mediapipe.png',
  wiringImageAlt: 'Diagrama webcam + Python + Arduino Uno + 5 LEDs em protoboard.',
  wiringCaption: 'PC com webcam → Python (MediaPipe) → Serial → Arduino → 5 LEDs.',
  summary:
    'Use a câmera do computador com MediaPipe Hands para detectar cada dedo estendido e acender o LED correspondente via Arduino.',
  warnings: [
    'Instale as bibliotecas Python: pip install opencv-python mediapipe pyserial. O OpenCV pode exigir a reinstalação manual do numpy se houver conflito.',
    'Antes de rodar o Python, verifique a porta serial do Arduino (COM3, /dev/ttyUSB0 etc.) e ajuste no código.',
    'Use LEDs de cores diferentes para facilitar a associação visual com cada dedo.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Uno ou Nano' },
    { id: 'leds', name: '5x LEDs (cores diferentes)' },
    { id: 'resistores', name: '5x Resistores 220Ω' },
    { id: 'protoboard', name: 'Protoboard + Jumpers' },
    { id: 'webcam', name: 'Webcam USB' },
  ],
  connections: [
    { from: 'LED1 · Anodo', to: 'Arduino · D3 (→ 220Ω)', label: 'Polegar' },
    { from: 'LED1 · Catodo', to: 'Arduino · GND', label: 'GND' },
    { from: 'LED2 · Anodo', to: 'Arduino · D4 (→ 220Ω)', label: 'Indicador' },
    { from: 'LED2 · Catodo', to: 'Arduino · GND', label: 'GND' },
    { from: 'LED3 · Anodo', to: 'Arduino · D5 (→ 220Ω)', label: 'Médio' },
    { from: 'LED3 · Catodo', to: 'Arduino · GND', label: 'GND' },
    { from: 'LED4 · Anodo', to: 'Arduino · D6 (→ 220Ω)', label: 'Anelar' },
    { from: 'LED4 · Catodo', to: 'Arduino · GND', label: 'GND' },
    { from: 'LED5 · Anodo', to: 'Arduino · D7 (→ 220Ω)', label: 'Mínimo' },
    { from: 'LED5 · Catodo', to: 'Arduino · GND', label: 'GND' },
  ],
  setupSteps: [
    'Monte os 5 LEDs no protoboard: o anodo (perna longa) de cada LED vai a um pino digital do Arduino com resistor de 220Ω em série; o catodo (perna curta) vai ao GND.',
    'Carregue o código Arduino (controle_gestos.ino) na placa.',
    'Abra o Monitor Serial da IDE para conferir se os números "00000" a "11111" aparecem quando os dedos são movidos — isso confirma a comunicação.',
    'Instale as dependências Python: pip install opencv-python mediapipe pyserial numpy.',
    'Ajuste a PORTA_SERIAL no script Python (ex.: COM3 no Windows, /dev/ttyUSB0 no Linux).',
    'Execute o script Python com a webcam conectada. Posicione a mão na frente da câmera e veja os LEDs acenderem de acordo com os dedos estendidos.',
  ],
  extensions: [
    'Adicione um buzzer para emitir um tom diferente para cada dedo.',
    'Troque os LEDs por um display 7 segmentos para mostrar o número de dedos levantados (0–5).',
    'Use PWM nos pinos para controlar a intensidade de cada LED conforme a distância entre falanges.',
  ],
  code: `// Controle por Gestos — Lúmina Tech
// Arduino recebe string binária (5 chars) pelo Serial e acende LEDs

const int pins[] = {3, 4, 5, 6, 7};

void setup() {
  for (int i = 0; i < 5; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], LOW);
  }
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() >= 5) {
    char buffer[6];
    int len = Serial.readBytesUntil('\\n', buffer, 5);
    buffer[len] = '\\0';

    for (int i = 0; i < len && i < 5; i++) {
      if (buffer[i] == '1') {
        digitalWrite(pins[i], HIGH);
      } else {
        digitalWrite(pins[i], LOW);
      }
    }
  }
}

// ============================================================
//  PYTHON — controle_gestos.py  (roda no PC / Raspberry Pi)
// ============================================================
// Dependências: pip install opencv-python mediapipe pyserial numpy
//
// import cv2
// import mediapipe as mp
// import serial
// import time
//
// PORTA_SERIAL = 'COM3'   # Ajuste conforme seu sistema
// BAUDRATE = 9600
//
// arduino = serial.Serial(PORTA_SERIAL, BAUDRATE, timeout=0.1)
// time.sleep(2)
//
// mp_hands = mp.solutions.hands
// hands = mp_hands.Hands(
//     static_image_mode=False,
//     max_num_hands=1,
//     min_detection_confidence=0.7,
//     min_tracking_confidence=0.6,
// )
// mp_draw = mp.solutions.drawing_utils
//
// cap = cv2.VideoCapture(0)
//
// def dedos_estendidos(landmarks):
//     """Retorna lista de 5 booleanos: [polegar, indicador, medio, anelar, minimo]"""
//     dedos = []
//
//     # Polegar: compara x da ponta (4) com x da articulacao (3)
//     dedos.append(landmarks[4].x > landmarks[3].x)
//
//     # Demais dedos: ponta (8,12,16,20) acima da articulacao PIP (6,10,14,18)
//     for tip, pip in [(8, 6), (12, 10), (16, 14), (20, 18)]:
//         dedos.append(landmarks[tip].y < landmarks[pip].y)
//
//     return dedos
//
// while cap.isOpened():
//     ret, frame = cap.read()
//     if not ret:
//         break
//
//     frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
//     resultado = hands.process(frame_rgb)
//
//     estado = '00000'
//
//     if resultado.multi_hand_landmarks:
//         for mao in resultado.multi_hand_landmarks:
//             mp_draw.draw_landmarks(frame, mao, mp_hands.HAND_CONNECTIONS)
//             dedos = dedos_estendidos(mao.landmark)
//             estado = ''.join('1' if d else '0' for d in dedos)
//
//     arduino.write((estado + '\\n').encode())
//
//     cv2.putText(frame, f'Dedos: {estado}', (10, 30),
//                 cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
//     cv2.imshow('Controle por Gestos', frame)
//
//     if cv2.waitKey(1) & 0xFF == ord('q'):
//         break
//
// cap.release()
// cv2.destroyAllWindows()
// arduino.close()
`,
};

const jardim: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'jardim_automatico.ino',
  wiringImage: '/wiring/jardim-automatico.png',
  wiringImageAlt: 'Arduino Uno com sensor de umidade do solo FC-28 e módulo relé ligado a uma bomba d\'água.',
  wiringCaption: 'Arduino Uno + Sensor de Umidade FC-28 + Relé + Bomba — irrigação automatizada.',
  summary:
    'Jardim que rega as plantas automaticamente: o sensor de umidade do solo FC-28 mede a resistência elétrica da terra; quando está seca, o Arduino aciona um relé que liga a bomba d\'água.',
  warnings: [
    'O sensor FC-28 pode oxidar com uso prolongado. Prefira o modelo capacitivo (v1.2) que dura mais.',
    'A bomba d\'água deve ser alimentada por fonte externa (5V/2A ou 12V conforme o modelo). Nunca alimente a bomba diretamente pelo Arduino.',
    'Faça o teste com a mão no sensor antes de colocar no vaso para calibrar o limiar de umidade no código.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Uno' },
    { id: 'sensor-solo', name: 'Sensor de Umidade FC-28' },
    { id: 'rele', name: 'Módulo Relé 1 canal' },
    { id: 'bomba', name: 'Bomba d\'água 5V ou 12V' },
    { id: 'fonte', name: 'Fonte externa (conforme bomba)' },
    { id: 'protoboard', name: 'Protoboard + Jumpers' },
  ],
  connections: [
    { from: 'FC-28 · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'FC-28 · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'FC-28 · DO', to: 'Arduino · D7', label: 'Limiar (digital)' },
    { from: 'FC-28 · AO', to: 'Arduino · A0', label: 'Sinal analógico' },
    { from: 'Relé · VCC', to: 'Arduino · 5V', label: 'Vermelho' },
    { from: 'Relé · GND', to: 'Arduino · GND', label: 'Preto' },
    { from: 'Relé · IN', to: 'Arduino · D8', label: 'Sinal' },
    { from: 'Bomba · V+', to: 'Fonte externa · V+', label: 'Vermelho' },
    { from: 'Bomba · V-', to: 'Relé · COM', label: 'Preto' },
    { from: 'Relé · NO', to: 'Fonte externa · GND', label: 'NA (normalmente aberto)' },
  ],
  setupSteps: [
    'Conecte o sensor FC-28 ao Arduino: VCC no 5V, GND no GND, AO no A0 (leitura analógica) e DO no D7 (saída digital com trimpot).',
    'Conecte o relé: VCC no 5V, GND no GND, IN no D8.',
    'Alimente a bomba com fonte externa e interrompa o fio GND da bomba pelos contatos COM e NA do relé.',
    'Carregue o código no Arduino e abra o Monitor Serial em 9600 baud.',
    'Segure o sensor no ar (seco) e veja a leitura: úmido ~300, seco ~700+. Ajuste o LIMIAR_SECO no código conforme sua leitura.',
    'Enfie o sensor na terra do vaso e veja a bomba ligar quando a terra secar.',
  ],
  extensions: [
    'Adicione um display LCD 16x2 I2C para mostrar a leitura de umidade e o estado da bomba.',
    'Coloque um botão entre D2 e GND para alternar entre modo automático e manual.',
    'Use um sensor DHT22 para também monitorar temperatura e umidade do ar no jardim.',
    'Adicione um segundo relé para controlar uma lâmpada de cultivo (grow light) ligada a um timer.',
  ],
  code: `// Jardim Automático — Lúmina Tech
// Irrigação automática com sensor de umidade do solo FC-28

const int pinoSensor = A0;
const int pinoRele = 8;
const int pinoDigital = 7;

const int LIMIAR_SECO = 600;
const unsigned long TEMPO_IRRIGACAO = 5000;
const unsigned long INTERVALO_LEITURA = 2000;

void setup() {
  pinMode(pinoRele, OUTPUT);
  pinMode(pinoDigital, INPUT);
  digitalWrite(pinoRele, LOW);
  Serial.begin(9600);
  Serial.println("Jardim automatico pronto.");
}

void loop() {
  int leitura = analogRead(pinoSensor);
  bool secoDigital = digitalRead(pinoDigital) == LOW;

  Serial.print("Umidade (analogico): ");
  Serial.print(leitura);
  Serial.print(" | Digital: ");
  Serial.println(secoDigital ? "SECO" : "UMIDO");

  if (leitura > LIMIAR_SECO && secoDigital) {
    Serial.println("Solo seco! Ligando bomba...");
    digitalWrite(pinoRele, HIGH);
    delay(TEMPO_IRRIGACAO);
    digitalWrite(pinoRele, LOW);
    Serial.println("Irrigacao concluida.");
  }

  delay(INTERVALO_LEITURA);
}
`,
};

const piano: ProjectDetails = {
  kind: 'arduino',
  inoFilename: 'piano_arduino.ino',
  wiringImage: '/wiring/piano-arduino.png',
  wiringImageAlt: 'Arduino Uno com 5 botões tácteis e um buzzer piezo montados em protoboard.',
  wiringCaption: 'Arduino Uno + 5 botões + Buzzer Piezo — piano eletrônico com 5 notas.',
  summary:
    'Piano eletrônico com 5 botões que reproduzem as notas Dó, Ré, Mi, Fá e Sol em um buzzer piezo. Cada botão aciona uma frequência diferente usando a função tone().',
  warnings: [
    'Use resistores de pull-down de 10kΩ em cada botão para evitar leituras flutuantes.',
    'O buzzer piezo pode ser conectado diretamente ao pino digital, mas um resistor de 100Ω em série ajuda a limitar a corrente.',
  ],
  components: [
    { id: 'arduino', name: 'Arduino Uno' },
    { id: 'buzzer', name: 'Buzzer Piezo 5V' },
    { id: 'botoes', name: '5x Botões Tácteis 6x6mm' },
    { id: 'resistores', name: '5x Resistores 10kΩ (pull-down)' },
    { id: 'protoboard', name: 'Protoboard + Jumpers' },
  ],
  connections: [
    { from: 'Botão Dó · Terminal 1', to: 'Arduino · D2', label: 'Sinal' },
    { from: 'Botão Dó · Terminal 2', to: 'Arduino · GND (→ 10kΩ)', label: 'Pull-down' },
    { from: 'Botão Ré · Terminal 1', to: 'Arduino · D3', label: 'Sinal' },
    { from: 'Botão Ré · Terminal 2', to: 'Arduino · GND (→ 10kΩ)', label: 'Pull-down' },
    { from: 'Botão Mi · Terminal 1', to: 'Arduino · D4', label: 'Sinal' },
    { from: 'Botão Mi · Terminal 2', to: 'Arduino · GND (→ 10kΩ)', label: 'Pull-down' },
    { from: 'Botão Fá · Terminal 1', to: 'Arduino · D5', label: 'Sinal' },
    { from: 'Botão Fá · Terminal 2', to: 'Arduino · GND (→ 10kΩ)', label: 'Pull-down' },
    { from: 'Botão Sol · Terminal 1', to: 'Arduino · D6', label: 'Sinal' },
    { from: 'Botão Sol · Terminal 2', to: 'Arduino · GND (→ 10kΩ)', label: 'Pull-down' },
    { from: 'Buzzer · V+', to: 'Arduino · D9', label: 'Sinal PWM' },
    { from: 'Buzzer · V-', to: 'Arduino · GND', label: 'Preto' },
  ],
  setupSteps: [
    'Conecte os 5 botões no protoboard: cada botão tem um terminal ligado a um pino digital (D2–D6) e o outro terminal ao GND por um resistor de 10kΩ (pull-down).',
    'Conecte o buzzer piezo: o pino positivo (mais longo) ao D9 e o negativo ao GND.',
    'Carregue o código no Arduino e abra o Monitor Serial em 9600 baud.',
    'Pressione cada botão e confira a nota tocada no buzzer.',
  ],
  extensions: [
    'Adicione as notas Lá (440 Hz) e Si (494 Hz) com mais dois botões nos pinos D7 e D8 para uma escala completa.',
    'Troque o buzzer por um mini alto-falante com transistor para ganhar volume.',
    'Acenda um LED associado a cada nota usando pinos D10–D14 com resistores de 220Ω.',
    'Grave uma melodia simples em um array e toque automaticamente ao ligar.',
  ],
  code: `// Piano com Botões — Lúmina Tech
// 5 botões reproduzem Dó, Ré, Mi, Fá, Sol no buzzer piezo

const int buzzer = 9;
const int NUM_NOTAS = 5;
const int botoes[NUM_NOTAS] = {2, 3, 4, 5, 6};
const int notas[NUM_NOTAS] = {262, 294, 330, 349, 392};
//                                Dó   Ré   Mi  Fá   Sol

void setup() {
  for (int i = 0; i < NUM_NOTAS; i++) {
    pinMode(botoes[i], INPUT);
  }
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
  Serial.println("Piano pronto! Pressione os botoes.");
}

void loop() {
  for (int i = 0; i < NUM_NOTAS; i++) {
    if (digitalRead(botoes[i]) == HIGH) {
      tone(buzzer, notas[i]);
      Serial.print("Tocando: ");
      Serial.println(notas[i]);
    }
  }
  delay(10); // pequeno debounce
  noTone(buzzer);
}
`,
};

export const projectDetails: Record<string, ProjectDetails> = {
  'lixeira-inteligente': lixeira,
  'carrinho-robo': carrinho,
  'sensor-umidade': estacao,
  'semaforo-inteligente': semaforo,
  'jardim-automatico': jardim,
  'piano-arduino': piano,
  'controle-gestos-mediapipe': controleGestos,
};

export function hasProjectDetails(projectId: string): boolean {
  return Object.prototype.hasOwnProperty.call(projectDetails, projectId);
}
