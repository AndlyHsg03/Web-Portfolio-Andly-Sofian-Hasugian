'use client';

import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

const FallingText = ({
  text = '',
  highlightWords = [],
  trigger = 'auto',
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  startAnimation = false
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ').filter(w => w.trim());

    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        return `<span style="display: inline-block; padding: 0 8px; white-space: nowrap;" class="select-none ${isHighlighted ? 'text-cyan-400 font-bold' : 'text-white/80'}">
          ${word}
        </span>`;
      })
      .join('');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
    } else if (startAnimation) {
      setEffectStarted(true);
    } else if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, startAnimation]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current || !textRef.current) return;

    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    // Boundaries
    const opts = { isStatic: true };
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 40, width + 100, 80, opts),
      Bodies.rectangle(-40, height / 2, 80, height + 100, opts),
      Bodies.rectangle(width + 40, height / 2, 80, height + 100, opts),
      Bodies.rectangle(width / 2, -40, width + 100, 80, opts)
    ]);

    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = [];

    wordSpans.forEach(span => {
      const rect = span.getBoundingClientRect();
      
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.85,
        frictionAir: 0.025,
        friction: 0.4
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 2
      });

      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);

      span.style.position = 'absolute';
      span.setAttribute('data-w', rect.width);
      span.setAttribute('data-h', rect.height);
      span.style.transformOrigin = '50% 50%';

      World.add(engine.world, body);
      wordBodies.push({ body, span });
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } }
    });
    World.add(engine.world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let rid;
    const update = () => {
      wordBodies.forEach(({ body, span }) => {
        const w = parseFloat(span.getAttribute('data-w'));
        const h = parseFloat(span.getAttribute('data-h'));
        
        span.style.left = (body.position.x - w / 2) + 'px';
        span.style.top = (body.position.y - h / 2) + 'px';
        span.style.transform = 'rotate(' + body.angle + 'rad)';
      });
      rid = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(rid);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, mouseConstraintStiffness]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 overflow-hidden transition-all duration-300 ${
        startAnimation ? 'border border-white/20 rounded-lg' : ''
      }`}
      onClick={trigger === 'click' ? () => !effectStarted && setEffectStarted(true) : undefined}
      onMouseEnter={trigger === 'hover' ? () => !effectStarted && setEffectStarted(true) : undefined}
    >
      <div
        ref={textRef}
        className="relative w-full p-6 text-center"
        style={{ fontSize, lineHeight: 1.6 }}
      />
    </div>
  );
};

export default FallingText;
