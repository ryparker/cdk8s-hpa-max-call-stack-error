import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import { Deployment, HorizontalPodAutoscaler, Volume } from 'cdk8s-plus-25';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);
    const deployment = new Deployment(this, 'deployment');
    const volumeMounts = [{ volume: Volume.fromEmptyDir(deployment, 'test-volume','test'), path: './test'}];

    deployment.addContainer({
      image: 'ubuntu',
      name: 'test',
      volumeMounts,
    });

    new HorizontalPodAutoscaler(this, 'HPA', {
      target: deployment,
      maxReplicas: 5,
    });
  }
}

const app = new App();
new MyChart(app, 'cdk8s-hpa-max-call-stack-error');
app.synth();
