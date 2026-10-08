import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const EMBER = "#ff5c1a";
const BONE = "#efe9dc";
const INK = "#0a0a0e";

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const up = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const y = interpolate(up, [0, 1], [120, 0]);
  const opacity = interpolate(frame, [0, 12], [0, 1]);
  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        fontFamily: "Arial Black, system-ui, sans-serif",
        fontWeight: 900,
        fontSize: 170,
        letterSpacing: -4,
        color: BONE,
        lineHeight: 1,
      }}
    >
      NITŌ
    </div>
  );
};

const Bumper: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const glow = interpolate(frame, [0, durationInFrames], [0.25, 0.55]);
  const barW = interpolate(frame, [150, durationInFrames - 20], [0, 920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagOp = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endOp = interpolate(frame, [durationInFrames - 30, durationInFrames - 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: INK, overflow: "hidden" }}>
      {/* ember glow blobs */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 45% at 50% 30%, rgba(255,92,26,${glow}), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(40% 30% at 80% 85%, rgba(45,212,191,0.18), transparent 70%)",
        }}
      />
      {/* content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 34,
            letterSpacing: 8,
            color: EMBER,
            opacity: tagOp,
          }}
        >
          DEV.FOLIO
        </div>
        <Title />
        <div
          style={{
            fontFamily: "Arial, system-ui, sans-serif",
            fontSize: 44,
            color: BONE,
            opacity: tagOp,
          }}
        >
          websites with a pulse.
        </div>
        {/* progress bar */}
        <div
          style={{
            width: 920,
            height: 10,
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            marginTop: 40,
          }}
        >
          <div
            style={{
              width: barW,
              height: "100%",
              borderRadius: 999,
              background: EMBER,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 120,
            fontFamily: "monospace",
            fontSize: 36,
            letterSpacing: 4,
            color: BONE,
            opacity: endOp,
          }}
        >
          @nitodev · nito.dpdns.org
        </div>
      </AbsoluteFill>
      {/* letterbox bars */}
      <Sequence from={200} durationInFrames={40}>
        <AbsoluteFill style={{ justifyContent: "flex-start", display: "flex" }}>
          <div style={{ height: 90, background: "#000", width: "100%" }} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="Bumper"
      component={Bumper}
      durationInFrames={240}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
