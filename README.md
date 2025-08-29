# React + Vite

## 🧩 **Componente** = Estado y propiedades
- **Propósito**: Almacena información y lógica muy acotada a su propio estado interno.
- **No toma decisiones globales**; solo sabe de sí mismo.
- **Ejemplos**:
  - `HealthComponent`: puntos de vida actuales, vida máxima, métodos de curar o recibir daño.
  - `MovementComponent`: velocidad, dirección, objetivo actual.
  - `ModelComponent`: referencia al modelo 3D y materiales.
- **Regla mental**: *Si lo puedes describir como “tiene…” o “es…” → es un componente*.

💡 Un componente es como la ficha técnica del enemigo: qué atributos tiene y algunas funciones para manipular solo esos atributos.

---

## ⚙️ **Sistema** = Comportamiento y reglas
- **Propósito**: Ejecuta lógica y toma decisiones usando uno o más componentes de la entidad.
- **Contiene**: Algoritmos, cálculos, reacciones a eventos.
- **Ejemplos**:
  - `WaypointSystem`: revisa el `MovementComponent` y mueve la posición siguiendo waypoints.
  - `AttackSystem`: busca un objetivo y usa `AttackComponent` para calcular y aplicar daño.
  - `AnimationSystem`: revisa el estado y activa animaciones en el `ModelComponent`.
- **Regla mental**: *Si lo puedes describir como “hace…” o “controla…” → es un sistema*.

💡 Un sistema es como el entrenador: usa la ficha técnica (componentes) para decidir acciones cada frame.

---

## 📌 Ejemplo aplicado a tu Golem

| Parte       | Tipo        | Función |
|-------------|-------------|---------|
| Vida (cantidad y máxima) | Componente | Guarda datos de salud |
| Velocidad y dirección    | Componente | Guarda datos de movimiento |
| Moverse por puntos       | Sistema    | Usa el componente de movimiento para cambiar posición |
| Atacar si está cerca     | Sistema    | Usa componente de ataque y posición |


- Componente → “Qué soy / qué tengo”
Guarda datos y estado específicos (vida, velocidad, inventario, modelo 3D…), y a veces métodos muy puntuales para modificarse a sí mismo.
Piensa en él como la ficha técnica o las “propiedades” de la entidad.
- Sistema → “Qué hago con eso”
Usa uno o varios componentes para aplicar lógica, reglas o comportamientos (mover, atacar, seguir waypoints, reproducir animaciones…).
Es como el director de orquesta que lee las fichas y las hace funcionar juntas.

💡 Una buena manera de recordarlo en tus proyectos de BlashNest es esta frase:
"El componente sabe lo que es, el sistema decide qué hace con lo que es."


