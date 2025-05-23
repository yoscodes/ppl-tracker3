import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Mail } from "lucide-react";

export default function RegistrationConfirmation() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <Card className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            メールを確認してください
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Mail className="h-16 w-16 text-blue-500" />
          </div>
          <p className="text-gray-600 mb-4">
            パスワードリセット用のリンクをメールアドレスに送信しました。受信トレイをご確認の上、リンクをクリックしてパスワードをリセットしてください。
          </p>
          <p className="text-sm text-gray-500">
            メールが見つからない場合は、迷惑メールフォルダを確認してください。
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
